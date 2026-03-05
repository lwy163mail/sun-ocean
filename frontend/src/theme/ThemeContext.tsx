import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';

export type ThemeType = 'light' | 'dark' | 'blue' | 'green' | 'purple';

interface ThemeConfig {
  name: string;
  primaryColor: string;
  backgroundColor: string;
  cardBackground: string;
  textColor: string;
  textSecondary: string;
  borderColor: string;
  isDark?: boolean;
}

const themes: Record<ThemeType, ThemeConfig> = {
  light: {
    name: '明亮',
    primaryColor: '#1677ff',
    backgroundColor: '#f5f5f5',
    cardBackground: '#ffffff',
    textColor: '#262626',
    textSecondary: '#8c8c8c',
    borderColor: '#f0f0f0',
  },
  dark: {
    name: '深色',
    primaryColor: '#177ddc',
    backgroundColor: '#141414',
    cardBackground: '#1f1f1f',
    textColor: '#ffffff',
    textSecondary: '#a6a6a6',
    borderColor: '#434343',
    isDark: true,
  },
  blue: {
    name: '蓝色',
    primaryColor: '#1890ff',
    backgroundColor: '#e6f7ff',
    cardBackground: '#ffffff',
    textColor: '#0050b3',
    textSecondary: '#5c8abc',
    borderColor: '#91d5ff',
  },
  green: {
    name: '绿色',
    primaryColor: '#52c41a',
    backgroundColor: '#f6ffed',
    cardBackground: '#ffffff',
    textColor: '#135200',
    textSecondary: '#5b8c5a',
    borderColor: '#b7eb8f',
  },
  purple: {
    name: '紫色',
    primaryColor: '#722ed1',
    backgroundColor: '#f9f0ff',
    cardBackground: '#ffffff',
    textColor: '#391085',
    textSecondary: '#7b61ab',
    borderColor: '#d3adf7',
  },
};

interface ThemeContextType {
  currentTheme: ThemeType;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeType) => void;
  availableThemes: ThemeType[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export { themes };

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('light');

  const themeConfig = themes[currentTheme];

  const value: ThemeContextType = {
    currentTheme,
    themeConfig,
    setTheme: setCurrentTheme,
    availableThemes: Object.keys(themes) as ThemeType[],
  };

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: themeConfig.primaryColor,
            borderRadius: 8,
            colorBgContainer: themeConfig.cardBackground,
            colorBorder: themeConfig.borderColor,
            colorText: themeConfig.textColor,
            colorTextSecondary: themeConfig.textSecondary,
            colorBgLayout: themeConfig.backgroundColor,
          },
          algorithm: themeConfig.isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
          components: {
            Card: {
              borderRadiusLG: 12,
              boxShadowTertiary: '0 2px 8px rgba(0, 0, 0, 0.06)',
            },
            Button: {
              borderRadius: 6,
              controlHeight: 36,
            },
            Input: {
              borderRadius: 6,
              controlHeight: 36,
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};