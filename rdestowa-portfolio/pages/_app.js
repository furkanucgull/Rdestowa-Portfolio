import '../styles/globals.css';
import styles from '../styles/style.css';
import { ThemeProvider } from 'next-themes';

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
