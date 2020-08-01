import React, { SFC, Fragment } from 'react';
import { StackHeaderProps } from '@react-navigation/stack';
import {
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  withStyles,
  ThemeType,
  Text,
  LayoutProps,
  IconProps,
} from '@ui-kitten/components';

const CloseIcon = (props: IconProps) => (
  <Icon {...props} name="close-outline" fill="#fff" />
);

interface HeaderProps extends StackHeaderProps, LayoutProps {
  isGoBack?: boolean;
}

const HeaderComponent: SFC<HeaderProps> = ({
  navigation,
  scene,
  eva,
  style,
  isGoBack = false,
}) => {
  const renderBackAction = () => (
    <TopNavigationAction onPress={navigation.goBack} icon={CloseIcon} />
  );

  return (
    <Layout level="1">
      <TopNavigation
        alignment="center"
        title={() => (
          <Text style={[eva?.style?.headerTitle, style]}>
            {scene.route.name}
          </Text>
        )}
        accessoryLeft={isGoBack ? renderBackAction : () => <Fragment />}
        style={[eva?.style?.headerContainer, style]}
      />
    </Layout>
  );
};

export default withStyles(HeaderComponent, (theme: ThemeType) => ({
  headerContainer: {
    backgroundColor: theme['color-primary-500'],
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
  },
}));
