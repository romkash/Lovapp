import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Alert, ScrollView, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const CARD_COUNT = 100;
const WAIT_TIME_MINUTES = 0.1; // Уменьшим время для тестирования (6 секунд)

export default function App() {
  const [showMain, setShowMain] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(-1);
  const [lastSeenTime, setLastSeenTime] = useState(0);
  const [cardsSeen, setCardsSeen] = useState(0);

  // Анимации
  const heartScale = new Animated.Value(1);
  const heartOpacity = new Animated.Value(1);
  const fadeAnim = new Animated.Value(0);
  const cardScale = new Animated.Value(0.8);
  const cardOpacity = new Animated.Value(0);

  // Анимация сердца
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(heartScale, {
          toValue: 1.3,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(heartScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Показываем основной экран через 3 секунды
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setShowMain(true));
    }, 3000);
  }, []);

  // Анимация появления карточки
  useEffect(() => {
    if (showCard) {
      Animated.parallel([
        Animated.timing(cardScale, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(cardOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      cardScale.setValue(0.8);
      cardOpacity.setValue(0);
    }
  }, [showCard]);

  // Проверка времени до следующей карточки
  const checkNextCardAvailability = () => {
    const now = Date.now();
    const timeSinceLastCard = now - lastSeenTime;
    const waitTimeMs = WAIT_TIME_MINUTES * 60 * 1000;

    if (lastSeenTime === 0 || timeSinceLastCard >= waitTimeMs) {
      return true;
    } else {
      const secondsLeft = Math.ceil((waitTimeMs - timeSinceLastCard) / 1000);
      Alert.alert(
        'Подожди немного',
        `Следующую причину можно увидеть через ${secondsLeft} секунд`,
        [{ text: 'OK' }]
      );
      return false;
    }
  };

  // Показать карточку
  const showNextCard = () => {
    const canSee = checkNextCardAvailability();
    if (canSee) {
      setLastSeenTime(Date.now());
      setCurrentCardIndex(prev => prev + 1);
      setCardsSeen(prev => prev + 1);
      setShowCard(true);
    }
  };

  // Скрыть карточку
  const hideCard = () => {
    setShowCard(false);
  };

  // Генерация причин
  const generateReason = (index) => {
    const reasons = [
      'За твою улыбку',
      'За твое доброе сердце',
      'За то, как ты меня понимаешь',
      'За твою поддержку в трудную минуту',
      'За твои глаза, в которых можно утонуть',
      'За твое чувство юмора',
      'За то, что ты делаешь меня лучше',
      'За твою нежность',
      'За твою заботу',
      'За то, что ты всегда веришь в меня',
      'За твою честность',
      'За твою смелость',
      'За твою мудрость',
      'За то, как ты заботишься о других',
      'За твою страсть',
      'За твою индивидуальность',
      'За то, что ты вдохновляешь меня',
      'За твое терпение',
      'За твою щедрость',
      'За твою красоту, которая идет изнутри',
      'За то, как ты слушаешь',
      'За твою способность прощать',
      'За твою преданность',
      'За то, что ты всегда находишь время для меня',
      'За твою способность радоваться мелочам',
      'За твою открытость',
      'За твою искренность',
      'За то, что ты всегда знаешь, как меня поддержать',
      'За твою способность удивлять',
      'За твою любовь к приключениям',
      'За то, что ты делаешь каждый день особенным',
      'За твою способность видеть хорошее в людях',
      'За твою силу духа',
      'За то, как ты заставляешь меня смеяться',
      'За твою непредсказуемость',
      'За твою надежность',
      'За твою страсть к жизни',
      'За то, что ты всегда стараешься понять меня',
      'За твою способность быть ребенком',
      'За твою зрелость в важных вопросах',
      'За то, как ты заботишься о нашей семье',
      'За твою способность находить выход из любой ситуации',
      'За твою веру в нас',
      'За то, что ты всегда говоришь правду',
      'За твою способность признавать ошибки',
      'За твою скромность',
      'За твою решительность',
      'За твою креативность',
      'За твою любовь к обучению',
      'За твое упорство',
      'За то, как ты выглядишь по утрам',
      'За твой голос',
      'За твой смех',
      'За твои объятия',
      'За твои поцелуи',
      'За то, как ты держишь мою руку',
      'За то, как ты смотришь на меня',
      'За то, как ты заботишься обо мне, когда я болен',
      'За то, как ты готовишь',
      'За то, как ты танцуешь',
      'За то, как ты поешь',
      'За твои маленькие привычки',
      'За то, как ты хмуришься, когда сосредоточен',
      'За то, как ты радуешься подаркам',
      'За то, как ты заботишься о животных',
      'За то, как ты играешь с детьми',
      'За твою любовь к природе',
      'За то, как ты читаешь книги',
      'За то, как ты смотришь фильмы',
      'За твои увлечения',
      'За то, как ты рассказываешь истории',
      'За то, как ты слушаешь музыку',
      'За то, как ты занимаешься спортом',
      'За то, как ты работаешь',
      'За то, как ты отдыхаешь',
      'За то, как ты путешествуешь',
      'За то, как ты встречаешь новый день',
      'За то, как ты засыпаешь',
      'За твои мечты',
      'За твои цели',
      'За твои достижения',
      'За то, как ты преодолеваешь трудности',
      'За то, как ты радуешься моим успехам',
      'За то, как ты поддерживаешь мои мечты',
      'За то, что ты всегда на моей стороне',
      'За то, что ты мой лучший друг',
      'За то, что ты всегда понимаешь меня без слов',
      'За то, что ты делаешь меня счастливым',
      'За то, что ты принимаешь меня таким, какой я есть',
      'За то, что ты научил меня любить',
      'За то, что ты рядом в радости и горе',
      'За то, что ты веришь в нашу любовь',
      'За то, что ты выбрал меня',
      'За то, что ты есть в моей жизни',
      'Просто за то, что ты - это ты'
    ];
    return reasons[index] || `Причина №${index + 1}`;
  };

  // Обработка кнопки "Назад" на Android
  useEffect(() => {
    const backAction = () => {
      if (showCard) {
        hideCard();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [showCard]);

  if (!showMain) {
    return (
      <View style={styles.container}>
        <View style={styles.heartWrapper}>
          <Animated.View style={[styles.heartContainer, {
            transform: [{ scale: heartScale }],
            opacity: heartOpacity
          }]}>
            <Ionicons name="heart" size={80} color="#e91e63" />
          </Animated.View>
          <Text style={styles.loadingText}>Загрузка любви...</Text>
        </View>
      </View>
    );
  }

  if (showCard) {
    return (
      <View style={styles.container}>
        <Animated.View style={[
          styles.card,
          {
            transform: [{ scale: cardScale }],
            opacity: cardOpacity
          }
        ]}>
          <Text style={styles.cardText}>{generateReason(currentCardIndex)}</Text>
          <Text style={styles.counter}>{cardsSeen}/{CARD_COUNT}</Text>
        </Animated.View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={hideCard}
        >
          <Text style={styles.backButtonText}>Закрыть</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Для самого дорогого человека</Text>

      <TouchableOpacity
        style={styles.mainButton}
        onPress={showNextCard}
      >
        <Text style={styles.buttonText}>100 причин почему я тебя люблю</Text>
      </TouchableOpacity>

      <Text style={styles.hint}>
        {cardsSeen > 0
          ? `Ты уже увидел(а) ${cardsSeen} причин ❤️`
          : 'Каждую новую причину можно увидеть через 6 секунд'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#e91e63',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#e91e63',
  },
  mainButton: {
    backgroundColor: '#e91e63',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  hint: {
    marginTop: 20,
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    width: width * 0.85,
    minHeight: height * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardText: {
    fontSize: 22,
    textAlign: 'center',
    color: '#e91e63',
    lineHeight: 32,
    fontWeight: '500',
  },
  counter: {
    marginTop: 20,
    fontSize: 16,
    color: '#888',
    fontStyle: 'italic',
  },
  backButton: {
    marginTop: 30,
    backgroundColor: '#e91e63',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
