import React, { useState, useEffect } from 'react';
import { ProgressBar, Text, ActivityIndicator, Colors, Switch, Button, TextInput } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import formatMoney_service from '../services/format_money';

const SetLimit = ({route, navigation }) => {

    const [data, setData] = React.useState(route.params); 
    const [spending_limit, setSpending_limit] = useState(data.non_formatted_spending_limit); 
    const [formatted_spending_limit, setFormatted_spending_limit] = useState(formatMoney_service.formatMoney(data.non_formatted_spending_limit));
    const [loader_text_display, setLoader_text_display] = useState('none');
    const [loader_spinner_animating, setLoader_spinner_animating] = useState(false); 
    const [viewOpacity, setViewOpacity] = useState(1); 
    const [save_btn_color, setSave_btn_color] = useState('#eeeeee');
    const [is_save_button_disabled, setIs_save_button_disabled] = useState(true);
    const [save_btn_text, setSave_btn_text] = useState('Save');
    
   
    const change_save_button_state = () => 
    {

        if (spending_limit == '' ) {
            console.log(" true");
            setIs_save_button_disabled(true);
        }
        else {
            console.log(" button can be now enabled");
            setSave_btn_color('#01d167');
            setIs_save_button_disabled(false);
        }

    }
 
    const save_limit = () => {

        setViewOpacity(1);
       // setLoader_spinner_animating(true);
        setSave_btn_text('Saving....');
       // setLoader_text_display('flex'); 
        const serverURL = 'https://wholphintech.com/adm/adm_server/aspire/save_limit.php'; 
        var body = new FormData();
        body.append('spending_limit', spending_limit);
        console.log(" sending spending_limit" + spending_limit); 
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                setSave_btn_text('Save');
                console.log('xhr.responseText');
                var tmp = xhr.responseText; 
                setViewOpacity(1);
                setLoader_spinner_animating(false);
                setLoader_text_display('none'); 
                console.log("... save_limit " + xhr.responseText + "...");
                navigation.navigate("Home");
            }
        }
        xhr.open('POST', serverURL, true);
        xhr.send(body);
    }
    useEffect(() => {
        change_save_button_state();
        
    }, [spending_limit]);

 


    return (
        <View style={[styles.container, {
            // Try setting `flexDirection` to `"row"`.

        }]}>


            <View style={{
                opacity: viewOpacity,

                flex: 1,

            }}   >

                <ActivityIndicator animating={loader_spinner_animating} color={Colors.green800} style={[styles.loader]} hidesWhenStopped={true} >

                </ActivityIndicator>

                <View style={[styles.row_card_top]}  > 
                        <TouchableOpacity style={[styles.text_heading]} onPress={() => {
                        navigation.goBack();
                        }
                        }>
                        <Icon name="ios-chevron-back-outline" size={25} style={styles.back_icon} />
 
                        </TouchableOpacity> 
                </View>

                <View style={[styles.top_card]}  >
                    <View style={[styles.inner_top_card]}  >
                        <Text style={styles.text_heading}>Spending Limit</Text> 
                    </View> 
                </View>






                <View style={[styles.container2]} > 
                    <ScrollView style={[styles.scroll_container]}> 
                        <View style={[styles.scroll_inner_container]}> 

                            <View style={[styles.box_background_card]}> 
                            </View>
                            <View style={[styles.background_card2]}>
                                <View style={[styles.row_card]}>

                                    <View style={[styles.row2]}> 
                                        <Icon name="speedometer-outline" size={18} style={styles.speedometer_icon}  /> 
                                        <Text style={styles.text_1}>Set a weekly debit card spending limit</Text> 
                                    </View>


                                    <View style={[styles.row2]}> 
                                        <View   style={styles.small_currency_box} >
                                            <Text style={styles.small_currency_box_text}> S$</Text> 
                                        </View> 
                                        <Text style={styles.text_limit}>{formatMoney_service.formatMoney(spending_limit)}</Text>

                                    </View> 

                                    <View  style={[styles.line]}  /> 
                                </View>
 
                                <View style={[styles.row_card]}> 
                                    <Text style={styles.text_2}>Here weekly means the last 7 days- not the calendar week</Text> 
                                </View>



                                <View style={[styles.row_card]}>
                                    <View style={{ alignItems: "center",flexDirection:"row" }}>

                                        <TouchableOpacity style={[styles.small_button]} onPress={() => {
                                            setSpending_limit(5000);
                                        }
                                        }>
                                            <Text style={styles.button_text2}> S$ 5,000</Text>

                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.small_button]} onPress={() => {
                                            setSpending_limit(10000);
                                        }
                                        } >
                                            <Text style={styles.button_text2}> S$ 10,000</Text>

                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.small_button]} onPress={() => {
                                            setSpending_limit(20000);
                                        }
                                        }>
                                            <Text style={styles.button_text2}> S$ 20,000</Text>

                                        </TouchableOpacity>

                                    </View>
                                </View>

 

                                <View style={[styles.row_card_save_btn]}>
                                    <View style={{alignItems:"center"}}>

                                        <TouchableOpacity disabled={is_save_button_disabled} activeOpacity={0.9} style={{
                                            width: 220,
                                            // backgroundColor:"#01d167",
                                           
                                            backgroundColor: save_btn_color,
                                            borderRadius: 30,
                                            height: 50,
                                            justifyContent: "center",}} onPress={() => {
                                            save_limit();
                                        }
                                        } >
                                            <Text style={styles.button_text}> {save_btn_text}</Text>

                                        </TouchableOpacity>

                                      </View>
                                </View> 
                            </View> 
                        </View> 
                    </ScrollView> 
                </View>  
            </View> 

        </View>
    );
};

export default SetLimit;


const styles = StyleSheet.create({
    container: { 
        height: '100%', 
        backgroundColor: "white"
    },
    
    back_icon:
    {
        color:"white" 
    },
    loader:
    {
        position: 'absolute',
        top: 150,
        marginLeft: '50%' 
    },
    container2: {

        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%', 
    },
    scroll_container: {

        width: '100%', 
    },
   

    top_card: {

        width: '100%',
        height: 260, 
        backgroundColor: "#0c365a",
        position: 'absolute', 
        zIndex: -1, 
        alignItems: 'center' 
    },

    inner_top_card: {
        marginTop: 80,
        width: '85%',

    }, 
    text_heading: { 
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold' 
    }, 

    bottom_mini_text: {
        fontSize: 14,
        color: "white",
        fontWeight: "500"
    },
      
    box_background_card: { 
        width: '100%',
        backgroundColor: 'white',
        marginTop:100,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        height:  20,

    }, 
    background_card2: { 
        width: '100%',
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center', 

    },

    row_card_top: { 
        paddingLeft:25,
        paddingTop: 25,
        height: 70,
        width: '85%', 
    },
    
    row_card: { 
        height: 70,
        width: '85%',
        backgroundColor: "white",
        
        justifyContent: 'center',
 
    },
    row_card_save_btn: { 
        marginTop:160,
        height: 70,
        width: '85%',
        backgroundColor: "white",

        justifyContent: 'center', 

    },

 line:
 {
     borderBottomColor: 'grey',
     borderBottomWidth: 0.3, 
 },





    text_limit:
    {
        fontSize:20,
        fontWeight:'bold',
        marginBottom:5, 
    },
    text_1 :
    {
        fontSize: 12,
        fontWeight: '500', 
    },
    text_2:
    {
        fontSize: 12, 
        color:"grey",
        marginBottom: 20

    },

   large_button:
   {
        width:220, 
        backgroundColor: "#eeeeee",
        borderRadius:30,
        height:50,
        justifyContent:"center",
              

   },
   button_text:
   {
       fontSize: 15,
       textAlign: "center",
       color:"white",
       fontWeight:"bold",
       letterSpacing:1
   },
    button_text2:
    {
        fontSize: 12,
        textAlign: "center",
        color: "#01d167",
        fontWeight:"bold"
         
    },
    small_button:
    {
        flex:1,
        width: 70,
        backgroundColor: "#effcf4",
        borderRadius: 3,
        height: 35,
        justifyContent: "center",
        marginRight:10
        
    },

    row2:
    { 
        flexDirection: 'row', 
        margin:0,
        padding:0,
        alignItems:'center' 

    },

    speedometer_icon:
    {
        color:"black",
        marginRight:10,
    },
    small_currency_box:
    {
        width:35,
        height:20,
        backgroundColor:'#01d167',
        borderRadius:3,
        marginRight:10,
        justifyContent:'center' 
    }, 
    small_currency_box_text:
    {
        fontSize: 12,
        textAlign: "center", 
        color: "white",
        fontWeight: "bold"
    },
});
