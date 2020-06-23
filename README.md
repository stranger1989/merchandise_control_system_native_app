# Merchandise Control System Native App

Native application for simple merchandise control system developed by react-native.

## Env setting

Create `.env` and `env.d.ts` file on root path for switch app or storybook.
Here is the example config.ini file as below.

### .env

```
EXPO_START_ENV='application'
<!-- EXPO_START_ENV='storybook' -->

EXPO_BASE_URL={ API_BASE_URL }
```

### env.d.ts

```typescript
declare module 'react-native-dotenv' {
  export const EXPO_START_ENV: string;
  export const EXPO_BASE_URL: string;
}
```

## Launch expo devtools

Run the expo, It will launch expo devtools in browser.

```shell
npm start
```

## Launch expo app in ios

```shell
npm run ios
```

## Launch expo app in android

```shell
npm run android
```

## Launch storybook

Switch `.env` to storybook

```
EXPO_START_ENV='storybook'
```

```shell
npm run storybook
```

## Version Info

```
node v14.4.0
npm v6.14.5
expo v3.21.5
react v16.9.0
```
