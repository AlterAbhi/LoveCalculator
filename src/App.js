import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import '@fontsource/oooh-baby';

import { 
  Card,
  CardContent,
  Typography,
  Button as MuiButton,
  Box
} from '@mui/material';

// Valentine-themed colors
const theme = {
  pink: '#ff7eb9',
  red: '#ff2d55',
  white: '#ffffff',
  gold: '#FFD700',
};

// Keyframes for animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const heartBeat = keyframes`
  0% { transform: scale(1); }
  25% { transform: scale(1.1); }
  40% { transform: scale(1); }
  60% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const popIn = keyframes`
  0% { transform: scale(0); opacity: 0; }
  80% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const burn = keyframes`
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0) rotate(360deg); opacity: 0; }
`;

const tear = keyframes`
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0) rotate(-360deg); opacity: 0; }
`;

const shred = keyframes`
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0) translateY(100px); opacity: 0; }
`;

const AnimatedTitle = styled(Typography)`
  && {
    animation: ${float} 3s ease-in-out infinite;
    .heart {
      display: inline-block;
      animation: ${heartBeat} 1.5s ease-in-out infinite;
      transform-origin: center;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(45deg, ${theme.pink}, ${theme.red});
  color: ${theme.white};
  font-family: 'Dancing Script', cursive;
  text-align: center;
`;

const StyledCard = styled(Card)`
  && {
    background: ${theme.white};
    max-width: 500px;
    width: 90%;
    margin: 20px auto;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

const ProgressCircle = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 40px auto;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: conic-gradient(
      ${theme.pink} ${props => props.percentage}%,
      transparent ${props => props.percentage}%
    );
    transform: rotate(-90deg);
    transition: background 1.5s ease-in-out;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 85%;
    height: 85%;
    background: ${theme.white};
    border-radius: 50%;
  }
`;

const ProgressText = styled.div`
  position: relative;
  z-index: 1;
  font-family: 'Dancing Script', cursive;
  font-size: 3rem;
  font-weight: bold;
  color: ${theme.red};
`;

const Input = styled.input`
  padding: 12px;
  margin: 10px;
  border: 2px solid ${theme.white};
  border-radius: 8px;
  background: transparent;
  color: ${theme.white};
  font-family: 'Dancing Script', cursive;
  font-size: 1rem;
  outline: none;
  width: 80%;
  max-width: 300px;
  &::placeholder {
    color: ${theme.white};
    opacity: 0.7;
  }
`;

const StyledButton = styled(MuiButton)`
  && {
    padding: 12px 24px;
    margin: 20px;
    background-color: ${props => props.variant === 'contained' ? theme.red : theme.white};
    color: ${props => props.variant === 'contained' ? theme.white : theme.red};
    font-family: 'Dancing Script', cursive;
    font-size: 1rem;
    text-transform: none;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      background-color: ${props => props.variant === 'contained' ? theme.pink : theme.white};
      transform: translateY(-2px);
    }
  }
`;

const LetterContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 20px;
  z-index: 10;
`;

const Letter = styled.div`
  width: 100px;
  height: 80px;
  background: ${theme.white};
  border: 2px solid ${theme.gold};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Dancing Script', cursive;
  font-size: 1rem;
  color: ${theme.red};
  cursor: pointer;
  transition: transform 0.3s ease;
  animation: ${popIn} 0.5s ease;
  animation: ${props => {
    if (props.isSelected) return popIn;
    switch (props.animation) {
      case 'burn': return burn;
      case 'tear': return tear;
      case 'shred': return shred;
      default: return 'none';
    }
  }} 0.5s ease forwards;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 5;
`;

const LetterContent = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: ${theme.white};
  color: ${theme.red};
  border-radius: 10px;
  max-width: 400px;
  text-align: center;
`;

// Response Messages
const getResponse = (type) => {
  switch (type) {
    case 'funny':
      return {
        headline: "Oops! Maybe it's time to swipe left? 😂",
        content: `Dear Friend,\n\nNot every connection is meant to last, and sometimes, walking away is the best choice. Rejection isn't failure—it's redirection toward something better. Just like swiping left, life gives you the power to choose what aligns with your growth. Trust that the right people and opportunities will find you at the right time. Keep moving forward; the best is yet to come.\n\nWith positivity,\n[Your Admin]`,
      };
    case 'flirty':
      return {
        headline: "There's potential here... wanna grab coffee? ☕",
        content: `Dear Romantic,\n\nSometimes, a little spark is all you need to ignite something magical. Whether it's a shared laugh, a lingering glance, or a simple cup of coffee, every moment counts. Take a chance, and who knows? This could be the start of something beautiful.\n\nWith love,\n[Your Admin]`,
      };
    case 'sarcastic':
      return {
        headline: "Meh, it's not the worst. Could be better. 😏",
        content: `Dear Realist,\n\nLet's face it—not every love story is a fairy tale. Sometimes, it's just a series of awkward moments and questionable decisions. But hey, at least you're trying, right? Keep your expectations low, and you'll never be disappointed.\n\nWith sarcasm,\n[Your Admin]`,
      };
    case 'supportive':
      return {
        headline: "Don't worry, I see a spark! 💘",
        content: `Dear Dreamer,\n\nEvery great love story starts with a single spark. Whether it's a shared interest, a kind gesture, or a moment of connection, these small beginnings can lead to something extraordinary. Keep your heart open, and trust that love will find its way to you.\n\nWith support,\n[Your Admin]`,
      };
    default:
      return { headline: "", content: "" };
  }
};

// Love Calculation Logic
const calculateLove = (name1, name2) => {
  const combinedNames = (name1 + "Loves" + name2).toLowerCase().replace(/\s/g, '');
  const frequencyMap = {};
  for (const char of combinedNames) {
    frequencyMap[char] = (frequencyMap[char] || 0) + 1;
  }
  const frequencyString = Object.values(frequencyMap).join('');
  let result = frequencyString;
  while (result.length > 2) {
    let newResult = '';
    const mid = Math.floor(result.length / 2);
    for (let i = 0; i < mid; i++) {
      const left = parseInt(result[i], 10);
      const right = parseInt(result[result.length - 1 - i], 10);
      newResult += (left + right).toString();
    }
    if (result.length % 2 !== 0) {
      newResult += result[mid];
    }
    result = newResult;
  }
  return parseInt(result, 10);
};

function App() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState(null);
  const [showLetters, setShowLetters] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [animation, setAnimation] = useState(null);
  const [displayedPercentage, setDisplayedPercentage] = useState(0);

  useEffect(() => {
    if (result !== null) {
      const duration = 1500; // 1.5 seconds
      const steps = 60; // 60 frames
      const increment = result / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= result) {
          setDisplayedPercentage(result);
          clearInterval(timer);
        } else {
          setDisplayedPercentage(Math.round(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [result]);

  const handleCalculate = () => {
    if (name1.trim() && name2.trim()) {
      const lovePercentage = calculateLove(name1, name2);
      setResult(lovePercentage);
      setShowLetters(false);
      setSelectedLetter(null);
    } else {
      alert('Please enter both names!');
    }
  };

  const handleCreativeButtonClick = () => {
    setShowLetters(true);
  };

  const handleLetterClick = (type) => {
    setSelectedLetter(type);
    setAnimation('burn');
    setTimeout(() => {
      setShowLetters(false);
    }, 500);
  };

  return (
    <Container>
      <AnimatedTitle variant="h3" component="h1" sx={{ color: 'white', mb: 3, fontFamily: '"Oooh Baby", cursive !important', }}>
        Love Calculator <span className="heart">❤️</span>
      </AnimatedTitle>
      
      {!result ? (
        <Box sx={{ width: '100%', maxWidth: 500 }}>
          <Input
            type="text"
            placeholder="Your Name"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Crush's Name"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
          />
          <StyledButton 
            variant="contained" 
            onClick={handleCalculate}
            fullWidth
          >
            Calculate Love
          </StyledButton>
        </Box>
      ) : (
        <StyledCard>
          <CardContent>
            <Typography  sx={{ fontFamily: 'Courgette, cursive', fontSize: '20px', fontWeight: 'bold' }} variant="h4" component="h2" gutterBottom>
              Your Love Percentage
            </Typography>
            
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Percentage of love between
            </Typography>
            
            <Typography variant="h5" color="error" sx={{ fontWeight: 'bold', mb: 4 }}>
              {name1} & {name2}
            </Typography>
            
            <ProgressCircle percentage={displayedPercentage}>
              <ProgressText>{displayedPercentage}%</ProgressText>
            </ProgressCircle>
            
            <Typography variant="body1" sx={{ fontStyle: 'italic', my: 3, color: 'text.secondary' }}>
              Your love will be a testament to the power of forgiveness,
              healing wounds and fostering growth.
            </Typography>
            
            <Box sx={{ mt: 2 }}>
              <StyledButton
                variant="contained"
                onClick={handleCreativeButtonClick}
                sx={{ display: 'block', mx: 'auto' }}
              >
                Reveal Your Fate!
              </StyledButton>
            </Box>
          </CardContent>
        </StyledCard>
      )}

      {showLetters && (
        <>
          <Overlay />
          <LetterContainer>
            {['funny', 'flirty', 'sarcastic', 'supportive'].map((type) => (
              <Letter
                key={type}
                onClick={() => handleLetterClick(type)}
                isSelected={selectedLetter === type}
                animation={selectedLetter && selectedLetter !== type ? animation : null}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Letter>
            ))}
          </LetterContainer>
        </>
      )}
      
      {selectedLetter && (
        <LetterContent>
          <h2>{getResponse(selectedLetter).headline}</h2>
          <p style={{ whiteSpace: 'pre-line' }}>{getResponse(selectedLetter).content}</p>
        </LetterContent>
      )}
    </Container>
  );
}

export default App;