/**
 * Created by echessa on 4/24/15.
 */

'use strict';

var React = require('react-native');

var {
    StyleSheet,
    Text,
    View,
    Component,
    Image
    } = React;

var styles = StyleSheet.create({
    container: {
        marginTop: 75,
        alignItems: 'center'
    },
    image: {
        width: 107,
        height: 165,
        padding: 10
    },
    description: {
        padding: 10,
        fontSize: 15,
        color: '#656565'
    }
});

class BookDetail extends Component {
    render() {
        var book = this.props.responseData;
        var imageURI = (typeof book.headshot !== 'undefined') ? book.headshot : '';
        var description = (typeof book.first_name !== 'undefined') ? book.first_name : '';
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{uri: imageURI}} />
                <Text style={styles.description}>{description}</Text>
            </View>
        );
    }
}

module.exports = BookDetail;