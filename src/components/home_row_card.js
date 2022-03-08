import React from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet, View  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeRowCard = (props) => {
    return (
        <View style={[styles.row_card]}> 
            <View style={[styles.row2]}>
                <Icon name={props.icon_name} size={25} style={styles.home_icons} />
                <Text style={styles.text_8}>{props.title}</Text> 
            </View>
            <View style={[styles.row2]}>
                <Text style={styles.text9}>{props.sub_title}</Text> 
            </View>

        </View>
    );
}



export default HomeRowCard;



const styles = StyleSheet.create({ 
    
    text_8: { 
        flex: 1,
        fontSize: 13,
        color: 'black',
        paddingLeft: '3%', 
    },
    text9: { 
        flex: 1,
        fontSize: 11,
        color: '#c4c4c4',
        paddingLeft: 36,
        marginTop: -7, 
    }, 
    row:
    {
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
    },
    row2:
    { 
        flexDirection: 'row', 
    },


 
    row_card: { 
        height: 70,
        width: '85%',
        backgroundColor: "white", 
        justifyContent: 'center', 

    },
 

    home_icons: { 
        color: "#325baf" 
    },


 
});
