// src/core/designSystemService.jsx
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Global } from '@emotion/react';
import { css } from './styles';
import { theme } from './theme';
import Button from './Button';
import Modal from './Modal';
import Dropdown from './Dropdown';
import DatePicker from './DatePicker';
import Toast from './Toast';
import FormInput from './FormInput';

const DesignSystemService = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en-US');
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    // load user preferences from local storage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
    }
  }, []);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // save user preference to local storage
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    // trigger re-render of components with updated language
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDropdownChange = (options) => {
    setDropdownOptions(options);
  };

  const handleToastShow = () => {
    setToastVisible(true);
    // auto-hide toast after 3 seconds
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <ThemeProvider theme={theme}>
      <Global styles={css.globalStyles} />
      <Button
        aria-label="Toggle theme"
        onClick={handleThemeToggle}
      >
        {isDarkMode ? 'Light mode' : 'Dark mode'}
      </Button>
      <Modal
        isOpen={modalOpen}
        onClose={handleModalClose}
        aria-label="Example modal"
      >
        <FormInput
          type="text"
          placeholder="Enter your name"
          aria-label="Name input"
        />
        <Dropdown
          options={dropdownOptions}
          onChange={handleDropdownChange}
          aria-label="Dropdown example"
        />
        <DatePicker
          defaultValue={new Date()}
          aria-label="Date picker example"
        />
      </Modal>
      {toastVisible && (
        <Toast
          message="This is a toast message"
          aria-label="Toast notification"
        />
      )}
    </ThemeProvider>
  );
};

export default DesignSystemService;