import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ProgressBar, Text, ActivityIndicator, Colors, Switch } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity, ScrollView ,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native'; 
import Bottom_navigator from '../components/bottom_navigator';  
import HomeRowCard from '../components/home_row_card'; 
import formatMoney_service  from '../services/format_money'; 
 
const Home = ({ navigation }) => {
    const [loader_spinner_animating, setLoader_spinner_animating] = useState(false);
    const [loader_text_display, setLoader_text_display] = useState('none');
    const [viewOpacity, setViewOpacity] = useState(0);
    const [card_icon_name, setCard_icon_name] = useState('eye');
    const [cvv_text_postition, setCvv_text_postiion] = useState(9);
    const [cvv_text_font, setCvv_text_font] = useState(13);
    const [acc_num_text_font, setAcc_num_text_fontfont] = useState(13);
    const [display_of_spending_limit, setDisplay_of_spending_limit] = useState('none');
    const [show_hide_card_text, setShow_hide_card_text] = useState('Show card number');
    const [user_name, setUser_name] = useState([]);
    const [acc_number, setAcc_number] = useState([]);
    const [card_num1, setCard_num1] = useState([]);
    const [card_num2, setCard_num2] = useState([]);
    const [card_num3, setCard_num3] = useState([]);
    const [card_num4, setCard_num4] = useState([]);
    const [validity, setValidity] = useState([]);
    const [cvv, setCvv] = useState([]);
    const [cvv_tmp, setCvv_tmp] = useState([]);
    const [acc_balance, setAcc_balance] = useState([]);
    const [spending_limit, setSpending_limit] = useState([]);
    const [money_spent_last_week, setMoney_spent_last_week] = useState(0);
    const isFocused = useIsFocused();
    const [isSwitchOn, setIsSwitchOn] =  useState(false); 
    const [spending_limit_percentage, setSpending_limit_percentage] = useState(0.1); 
    const hideSpending_limit_bar = () => { 

        
         setIsSwitchOn(false);
         setDisplay_of_spending_limit('none');
    }

    const showSpending_limit_bar = () => {


        setIsSwitchOn(true);
        setDisplay_of_spending_limit('flex');
    }
    const goTo_spending_limit_screen = (non_formatted_spending_limit) => {


        navigation.push("Set_limit", { non_formatted_spending_limit });
    }
    
    const onToggleSwitch = () => { 
        if (isSwitchOn == false) {
            setIsSwitchOn(!isSwitchOn);
            showSpending_limit_bar(); 
             var non_formatted_spending_limit = spending_limit.replace(/\,/g, '');
               non_formatted_spending_limit = Number(non_formatted_spending_limit);
               console.log("non_formatted_spending_limit " + non_formatted_spending_limit);

            const myTimeout = setTimeout(goTo_spending_limit_screen, 500, non_formatted_spending_limit);
               
        }
        else {
            hideSpending_limit_bar(); 
        }
    }
    const add_astericks_to_acc_num = () => {
        setCard_icon_name('eye');
        setShow_hide_card_text('Show card number');
        setCard_num1('\u2B24 \u2B24 \u2B24 \u2B24');
        setCard_num2('\u2B24 \u2B24 \u2B24 \u2B24');
        setCard_num3('\u2B24 \u2B24 \u2B24 \u2B24');
        setCvv("\u2605 \u2605 \u2605");
        setCvv_text_font(13);
        setAcc_num_text_fontfont(12);
    }

    const change_card_data = () => {
        if (card_icon_name == 'eye') {
            setCard_icon_name('eye-slash');
            setShow_hide_card_text('Hide card number');
            let full_card_num = acc_number;
            let card_num1 = full_card_num.slice(0, 4);
            let card_num2 = full_card_num.slice(4, 8);
            let card_num3 = full_card_num.slice(8, 12);
            let card_num4 = full_card_num.slice(12, 16);
            setCvv(cvv_tmp);
            setCard_num1(card_num1);
            setCard_num2(card_num2);
            setCard_num3(card_num3);
            setCard_num4(card_num4);
            setCvv_text_font(13);
            setAcc_num_text_fontfont(13);
        }
        else {
            add_astericks_to_acc_num();
        }

    }



    const get_user_bank_data = () => {
        setViewOpacity(1);
        setLoader_spinner_animating(true);
        setLoader_text_display('flex');
        const serverURL = 'https://wholphintech.com/adm/adm_server/aspire/get_user_bank_data.php';

        var body = new FormData();
        body.append('authToken', 'secret');
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                console.log('get_user_bank_data api response');
                var tmp = xhr.responseText;
                var res = JSON.parse(tmp);
                console.log(tmp);
                console.log(" name " + res[0].name);
                setUser_name(res[0].name);
                setAcc_number(res[0].acc_num);
                let full_card_num = res[0].acc_num;
                let card_num1 = full_card_num.slice(0, 4);
                let card_num2 = full_card_num.slice(4, 8);
                let card_num3 = full_card_num.slice(8, 12);
                let card_num4 = full_card_num.slice(12, 16);
                setCard_num1(card_num1);
                setCard_num2(card_num2);
                setCard_num3(card_num3);
                setCard_num4(card_num4);
                setCvv(res[0].cvv);
                setCvv_tmp(res[0].cvv); 
                add_astericks_to_acc_num(); 
                setValidity(res[0].validity); 
                setAcc_balance(formatMoney_service.formatMoney(res[0].balance));
                setSpending_limit(formatMoney_service.formatMoney(res[0].spending_limit));
                setMoney_spent_last_week(res[0].money_spent_last_week);
                if (res[0].spending_limit == '') {
                   
                }
                else
                {
                    const myTimeout = setTimeout(showSpending_limit_bar, 100);
                    const tmp_per = res[0].money_spent_last_week / res[0].spending_limit;
                    console.log("progress bar per is " + tmp_per);
                    setSpending_limit_percentage(tmp_per);
                }
               
               
                setViewOpacity(1);
                setLoader_spinner_animating(false);
                setLoader_text_display('none');

            }
        }
        xhr.open('POST', serverURL, true);
        xhr.send(body);
    }
  
    useFocusEffect(
        React.useCallback(() => {
            console.log("in home spending_limit is " + spending_limit);
            if (spending_limit == '') {
                const myTimeout = setTimeout(hideSpending_limit_bar, 100);
            }
            else{                            
                 const myTimeout = setTimeout(showSpending_limit_bar, 100);  
            }
             get_user_bank_data();   
           
        }, [spending_limit])
    );


    return (
        <View style={[styles.container, { 
        }]}>
 
            <View style={{
                opacity: viewOpacity, 
                flex: 1, 
            }}   >

                 <ActivityIndicator animating={loader_spinner_animating} color={Colors.green800} style={[styles.loader]} hidesWhenStopped={true} >
                 </ActivityIndicator>
 

                <View style={[styles.top_card]}  >
                    <View style={[styles.inner_top_card]}  >
                        <Text style={styles.text_heading}>Debit Card</Text>
                        <Text style={styles.text_small}>Available Balance</Text>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            alignItems: "center"
                        }}>
                            <View style={styles.small_currency_box} >
                                <Text style={styles.small_currency_box_text}> S$</Text> 
                            </View> 
                            <Text style={styles.text_balance}>    {acc_balance}</Text>

                        </View>
                    </View>

                </View>






                <View style={[styles.container2]} > 
                    <ScrollView style={[styles.scroll_container]}> 
                        <View style={[styles.scroll_inner_container]}> 
                            <View style={[styles.invisible_container]}> 
                            </View> 

                            <TouchableOpacity style={[styles.hide_card_box]}  >
                                <TouchableOpacity activeOpacity={.9} style={[styles.hide_card_button]} onPress={() => { change_card_data(); }} >
                                    <View style={[styles.row]} >
                                        <Icon name={card_icon_name} size={15} style={styles.hide_card_icon} />
                                        <Text style={styles.button_hide_card_num_text}>{show_hide_card_text}</Text>
                                    </View>
                                </TouchableOpacity>

                            </TouchableOpacity>
  
                            <View style={[styles.box]}  > 
                                <View style={[styles.row]} > 
                                    <Icon name="chevron-circle-up" size={25} style={styles.card_icon} />
                                    <Text style={styles.box_text_4}>
                                        aspire</Text> 
                                </View>
                                <Text style={styles.box_text}>{user_name}</Text>

                                <Text style={{
                                    fontSize: acc_num_text_font,
                                    marginTop: 18,
                                    fontWeight: 'bold',
                                    color: "white",
                                    letterSpacing: 1.1
                                }}>{card_num1}     {card_num2}       {card_num3}       {card_num4}</Text>
                                <View style={[styles.row2]} >
                                    <Text style={styles.box_text_2}>Thru:{validity}        CVV: </Text>
                                    <View style={{
                                        position: 'relative',
                                        top: cvv_text_postition,
                                        letterSpacing: 5
                                    }} >
                                        <Text style={{
                                            fontSize: cvv_text_font,
                                            fontWeight: 'bold',
                                            color: "white",
                                        }}>{cvv}</Text>
                                    </View>

                                </View>

                                <View style={[styles.row]} >
                                    <Text style={styles.box_text_3}>VISA</Text>

                                </View>

                            </View>
 
                            <View style={[styles.box_background_card]}>

                            </View>
                            <View style={[styles.background_card2]}>
                                <View style={{
                                    height: 70,
                                    width: '85%',
                                    backgroundColor: "white",
                                    justifyContent: 'center',
                                    display: display_of_spending_limit
                                }}>

                                    <View style={[styles.row2]}>
                                        <Text style={styles.text_6}>Debit card spending limit</Text>

                                        <Text style={[styles.text_money_spent_last_week]}>${money_spent_last_week} </Text><Text style={[styles.text_spending_limit]}>| ${spending_limit}</Text>

                                    </View>

                                    <ProgressBar progress={spending_limit_percentage} color={"#01d167"} style={[styles.bar]} />
                                </View>



                                <HomeRowCard title="Top up account" sub_title="Deposit Money to your account to use with card" icon_name="arrow-up" ></HomeRowCard>
 
                                <View style={[styles.row_card]}> 
                                    <View style={[styles.row2]}>
                                        <Icon name="tachometer" size={25} style={styles.home_icons} />
                                        <Text style={styles.text_8}>Weekly spending limit</Text>
                                        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />

                                    </View>
                                    <View style={[styles.row2]}>
                                        <Text style={styles.text9}>Your weekly spending limit is S$ {spending_limit}</Text>
                                     </View> 
                                </View> 
                                <HomeRowCard title="Freeze Card" sub_title="You Debit card is currently active" icon_name="tachometer" ></HomeRowCard>
                                <HomeRowCard title="Get a new card" sub_title="This deactivates your current debit card" icon_name="tachometer" ></HomeRowCard>
                                <HomeRowCard title="Deactivated cards" sub_title="Your previously deactivated cards" icon_name="tachometer" ></HomeRowCard>
                                
                              
                            </View> 
                        </View> 
                    </ScrollView> 

                </View>  
            </View>
 

            <Bottom_navigator></Bottom_navigator>
 
        </View>
    );
};

export default Home;


const styles = StyleSheet.create({
    container: { 
        height: '100%', 
        backgroundColor: "white"
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
    scroll_inner_container: {

        justifyContent: 'center',
        alignItems: 'center', 
    },

    invisible_container: { 
        height: 100 
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
        marginTop: 30,
        width: '85%',

    },
    text_white: {

        color: "white"


    },
    text_small_dark: { 
        color: "black",
        fontSize: 13, 
    },

    text_heading: { 
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold' 
    },
    text_small: { 
        fontSize: 14,
        color: 'white',
        marginTop: 20 
    },

    text_balance: { 
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',  
    },

    text_6: {
        flex: 1,
        fontSize: 13,
        color: 'black', 
    },
    text_7: { 
        fontSize: 13,
        color: 'black',
        justifyContent: 'flex-end' 
    },
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

    text_money_spent_last_week: { 
        fontSize: 12,
        fontWeight: "bold",
        color: '#01d167', 
    },

    text_spending_limit: { 
        fontSize: 12,
        color: '#c4c4c4', 
    },
    bottom_mini_text: {
        fontSize: 14,
        color: "white",
        fontWeight: "500"
    },
    hide_card_box: {

        position: 'relative',
        top: 20,
        width: '85%', 
        zIndex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',


    },

    hide_card_icon: { 
        color: "#01d167",
        marginRight: 8  
    },


    hide_card_button: {
        width: 150,
        height: 50,
        paddingRight: 15,
        paddingTop: 8,
        backgroundColor: "white",
        zIndex: 100,
        borderRadius: 7,
        elevation: 6,

    },
    button_hide_card_num_text: {
        fontSize: 12,
        color: "#6ce4a7",
        fontWeight: "800"
    },

    card_icon: { 
        color: "white",
        marginTop: 10,
        marginRight: 2

    },

    box: { 
        height: 190,
        width: '85%',
        backgroundColor: "#01d167",

        justifyContent: 'center',
        padding: '7%',
        borderRadius: 10,
        elevation: 6, 
        zIndex: 40

    },
    box_background_card: { 
        width: '100%',
        backgroundColor: 'white',
        marginTop: -140,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        height: 180, 
    },

    box_text: {
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        color: "white",
        marginTop: 10
    },
    box_text_2: {
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 10,
        color: "white",
        letterSpacing: 1.1,

    },
    box_text_3: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        color: "white",
        letterSpacing: 1.5, 
    },
    box_text_4: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: "white",
        letterSpacing: 1.5, 
    },
    box_text_5: {
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 20,
        color: "white",
        letterSpacing: 1.1, 

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
 
    background_card2: {  
        width: '100%',
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center', 
    },
    row_card: { 
        height: 70,
        width: '85%',
        backgroundColor: "white",

        justifyContent: 'center',  

    }, 

    bar: { 
        height: 15,
        marginTop: 5,
        borderRadius: 10 
    },

    home_icons: { 
        color: "#325baf" 

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
