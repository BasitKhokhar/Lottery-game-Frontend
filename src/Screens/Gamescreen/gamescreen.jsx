import React, { useEffect, useState, useRef } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { apiFetch } from '../../apiFetch';
import * as SecureStore from 'expo-secure-store';
import io from 'socket.io-client';
import Modal from 'react-native-modal';
import BoxGrid from './BoxGrid';
import Constants from 'expo-constants';
import LottieView from 'lottie-react-native';

import { useTheme } from "../../context/ThemeContext";
// import celebrationAnim from '../../../assets/loading.json';
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;
let socket; 

export default function GameScreen({ route }) {
  const { theme } = useTheme();
  const { gameType } = route.params;
  console.log("gametypeid in gamescreen", gameType)
  const [game, setGame] = useState(null);
  const [userChances, setUserChances] = useState(0);
  const [totalPrize, setTotalPrize] = useState(0);
  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const [revealedPrize, setRevealedPrize] = useState(null);

  const [playerCount, setPlayerCount] = useState({ count: 0, max: 0 });

  const lottieRef = useRef(null);

  useEffect(() => {

    const initSocket = async () => {
      const token = await SecureStore.getItemAsync('accessToken');
      if (!token) return console.error('No token found for socket.');

      socket = io(API_BASE_URL, {
        auth: { token },
      });

      socket.on('connect', () => {
        console.log('✅ Connected to socket:', socket.id);
      });

      socket.on('welcome', (msg) => {
        console.log('🟢 Server says:', msg);
      });

      socket.on('player_count_update', ({ count, max }) => {
        console.log(`👥 Player count update: ${count}/${max}`);
        setPlayerCount({ count, max });
      });

      // 🎯 Self reveal
      socket.on('box_revealed_self', ({ boxId, prizeAmount, newChances }) => {
        console.log('🎉 You revealed box', boxId, 'Prize:', prizeAmount);

        setGame(prev => {
          const updatedBoxes = prev.boxes.map(box =>
            box.id === boxId ? { ...box, revealed: true, prizeAmount } : box
          );
          checkAndRestartGame(updatedBoxes);
          return { ...prev, boxes: updatedBoxes };
        });

        setUserChances(newChances);
        setTotalPrize(prev => prev + prizeAmount);
        setRevealedPrize(prizeAmount);
        setShowPrizeModal(true);

        // Play animation
        if (lottieRef.current) {
          lottieRef.current.play();
        }

        // Auto close after 2.5s
        setTimeout(() => {
          setShowPrizeModal(false);
        }, 2500);
      });

      // 📢 Broadcast reveal
      socket.on('box_revealed_other', ({ boxId }) => {
        console.log('📢 Another player revealed box', boxId);

        setGame(prev => {
          const updatedBoxes = prev.boxes.map(box =>
            box.id === boxId ? { ...box, revealed: true } : box
          );
          checkAndRestartGame(updatedBoxes);
          return { ...prev, boxes: updatedBoxes };
        });
      });
    };

    initSocket();

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const initializeGame = async () => {
      try {
        // const token = await SecureStore.getItemAsync('accessToken');
        // if (!token) return console.error('Token not found');

        const joinRes = await apiFetch(`/gamedata/join-game/${gameType.id}`
        //   , {
        //   headers: { Authorization: `Bearer ${token}` },
        // }
      );
        const gameData = await joinRes.json();
        setGame(gameData);

        // 🆕 Join the game room on the socket
        if (socket) {
          socket.emit('join_game', {
            gameId: gameData.id,
            userId: gameData.userId, // make sure your backend sends this
          });
          console.log(`📡 Sent join_game event for gameId: ${gameData.id}, userId: ${gameData.userId}`);
        } else {
          console.warn("⚠️ Socket not yet connected when trying to join game.");
        }

        const chancesRes = await apiFetch(`/userchances/${gameType.id}`
        //   , {
        //   headers: { Authorization: `Bearer ${token}` },
        // }
      );
        const chancesData = await chancesRes.json();
        setUserChances(chancesData.chances);

        const totalPrizeRes = await apiFetch(`/gamedata/totalamount/${gameType.id}`
        //   , {
        //   headers: { Authorization: `Bearer ${token}` },
        // }
      );
        const totalPrizeData = await totalPrizeRes.json();
        setTotalPrize(totalPrizeData.totalPrize);

      } catch (err) {
        console.error('❌ Game init error:', err);
      }
    };

    initializeGame();
  }, []);

  const handleBoxClick = (boxId) => {
    console.log('🖱️ Tapped on box:', boxId);
    if (socket) socket.emit('reveal_box', { boxId });
    else console.error('Socket not initialized');
  };

  const checkAndRestartGame = async (updatedBoxes) => {
    const allRevealed = updatedBoxes.every(box => box.revealed);
    if (allRevealed) {
      console.log('🌀 All boxes revealed, restarting game...');
      try {
        // const token = await SecureStore.getItemAsync('accessToken');
        const res = await apiFetch(`/gamedata/join-game/${gameType.id}`
        //   , {
        //   headers: { Authorization: `Bearer ${token}` },
        // }
      );
        const newGameData = await res.json();
        setGame(newGameData);
      } catch (err) {
        console.error('🔁 Error restarting game:', err);
      }
    }
  };

  if (!game) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4B9CD3" />
        <Text style={{ marginTop: 10 }}>Loading game...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container,{backgroundColor: theme.background}]}>
      <BoxGrid
        boxes={game.boxes}
        userChances={userChances}
        onBoxClick={handleBoxClick}
        prizeAmount={totalPrize}
        gameType={gameType}
        playerCount={playerCount}
      />
      {/* Prize Modal with Animation */}
      <Modal isVisible={showPrizeModal} onBackdropPress={() => setShowPrizeModal(false)}>
        <View style={styles.modalContent}>
          <View style={{ backgroundColor: 'black', borderRadius: 8 }}>
            <LottieView
              source={require('../../../assets/celebration.json')}
              autoPlay
              loop
              style={{ width: 150, height: 150 }}
            />
          </View>

          <Text style={styles.prizeText}>🎁 You won</Text>
          <Text style={styles.prizeAmount}>Rs. {revealedPrize}</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  prizeText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
  },
  prizeAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#28a745',
  },
});
