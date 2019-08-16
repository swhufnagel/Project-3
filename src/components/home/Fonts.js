import { Font } from 'expo';
import { ActivityIndicator } from 'react-native';

constructor() {
    super();
    this.state={
        fontLoaded:false
    };
}

componentDidMount() {
    font.loadAsync({
        'FranklinGothic':require('./assets/fonts/framd.ttf')
    });

    this.ListeningStateChangedEvent({ fontLoaded: true});
}
render () {
    return (
        <view style = {style.container}>
            {this.state.fontLoaded?
            <Text style={{ fontFamily: "FranklinGothic"}}>
            Font Test For Native!!</Text>
        ) : (
            <ActivityIndicator size='large' />
        )}
        </view>
    );
}