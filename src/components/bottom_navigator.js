import React  from 'react';
import { Text  } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const Bottom_navigator = () => {
    return (
        <View style={[styles.bottom_nav]} >
            <TouchableOpacity style={[styles.bottom_mini_container]}  >
                <Icon name="chevron-circle-up" size={25} style={styles.bottom_nav_icon} />
                <Text style={styles.bottom_mini_text}> </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.bottom_mini_container]}  >
                <Icon name="credit-card" size={23} style={{ color: "#6ce4a7" }} />
                <Text style={styles.bottom_mini_text}> </Text>
            </TouchableOpacity>


            <TouchableOpacity style={[styles.bottom_mini_container]}  >
                <Icon name="arrows-h" size={23} style={styles.bottom_nav_icon} />
                <Text style={styles.bottom_mini_text}> </Text>

            </TouchableOpacity>
            <TouchableOpacity style={[styles.bottom_mini_container]}  >
                <Icon name="arrow-circle-up" size={23} style={styles.bottom_nav_icon} />
                <Text style={styles.bottom_mini_text}> </Text>

            </TouchableOpacity>
            <TouchableOpacity style={[styles.bottom_mini_container]}  >
                <Icon name="user" size={23} style={styles.bottom_nav_icon} />
                <Text style={styles.bottom_mini_text}> </Text>

            </TouchableOpacity>
        </View>

    );
}

 

export default Bottom_navigator;


const styles = StyleSheet.create({
    
     

      

  
    bottom_mini_text: {
        fontSize: 14,
        color: "white",
        fontWeight: "500"
    },
       
    card_icon: {

        color: "white",
        marginTop: 10,
        marginRight: 2

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

 

    bar: {


        height: 15,
        marginTop: 5,
        borderRadius: 10


    },

    home_icons: {


        color: "#325baf"


    },











    bottom_nav:
    {
        height: 60,
        width: '100%',

        flexDirection: "row"

    },
    bottom_mini_container: {
        margin: 0,
        flex: 1,
        elevation: 9,

        backgroundColor: "white ",

        justifyContent: 'center',
        alignItems: 'center',



    },

    bottom_nav_icon:
    {

        color: "lightgrey"


    },
    small_currency_box:
    {
        width: 35,
        height: 20,
        backgroundColor: '#01d167',
        borderRadius: 3,

        justifyContent: 'center'

    },
    small_currency_box_text:
    {
        fontSize: 12,
        textAlign: "center",

        color: "white",
        fontWeight: "bold"
    },
});
