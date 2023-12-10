import './App.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LoadingPage from './components/LoadingPage/LoadingPage';
import PlacesBlock from './components/PlacesBlock/PlacesBlock';
import PortfolioBlock from './components/PortfolioBlock/PortfolioBlock';
import PricesBlock from './components/PricesBlock/PricesBlock';
import WelcomeBlock from './components/WelcomeBlock/WelcomeBlock';
import React, { useState, useEffect } from 'react';


function App() {
  const [isMutedWV, setMutedWV] = useState(true);

  const [isVideoReady, setVideoReady] = useState(false);
  const [welcomeBlockHeight, setWelcomeBlockHeight] = useState();

  useEffect(() => {
    if(!isVideoReady) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVideoReady]);


  return (
    <div className="App">
      <LoadingPage
        isVideoReady={isVideoReady}
      />
      <Header
        welcomeBlockHeight={welcomeBlockHeight}
      />
      <WelcomeBlock
        setWelcomeBlockHeight={setWelcomeBlockHeight}
        setVideoReady={setVideoReady}
        isMuted={isMutedWV}
        setMuted={setMutedWV}
      />
      <PortfolioBlock
        setMutedVW={setMutedWV}
      />
      <PlacesBlock/> 
      <PricesBlock/>
      <Footer/> 
    </div>
  );
}

export default App;
