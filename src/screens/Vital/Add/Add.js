import React, { useState } from 'react';
import {View, Text, ActivityIndicator, TouchableWithoutFeedback, Dimensions} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Button} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { PRIMARY_COLOR } from '../../../utilities';
import {storeAPI} from './../../../api';
import moment from 'moment';

export default Add = ({navigation}) => {

    const [layout, setLayout] = useState({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    });

    const onLayout = (e) => {
        setLayout({
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        });
    }

    const [data, setData] = useState({
        temperature: 0,
        blood: 0,
        oxygen: {
            spo2: 0,
            pr: 0
        }
    });
    const [loading, setLoading] = useState({
        temperature: false,
        blood: false,
        oxygen: false
    });

    const submit = async() => {
        if(data.temperature != 0){
            storeAPI({
                type: "temperature",
                date: moment().format("YYYY-MM-DD"),
                reading: data.temperature
            });
        }

        if(data.blood != 0){
            storeAPI({
                type: "blood",
                date: moment().format("YYYY-MM-DD"),
                reading: data.blood
            });
        }

        if(data.oxygen.spo2 != 0){
            storeAPI({
                type: "oxygen_spo2",
                date: moment().format("YYYY-MM-DD"),
                reading: data.oxygen.spo2
            });
            storeAPI({
                type: "oxygen_pr",
                date: moment().format("YYYY-MM-DD"),
                reading: data.oxygen.pr
            });
        }

        navigation.goBack();
    }

    const captureTemperature = () => {
        setLoading({...loading, temperature: true});

        setTimeout(() => {

            setData({...data, temperature: Math.floor(Math.random() * 10) + 90});
            setLoading({...loading, temperature: false});
        }, 5000);

    };

    const captureBlood = () => {
        setLoading({...loading, blood: true});

        setTimeout(() => {
            setData({...data, blood: Math.floor(Math.random() * 10) + 120 + "/70"});
            setLoading({...loading, blood: false});
        }, 5000);

    };

    const captureOxygen = () => {
        setLoading({...loading, oxygen: true});

        setTimeout(() => {
            setData({...data, oxygen: {
                spo2: Math.floor(Math.random() * 10) + 90,
                pr: Math.floor(Math.random() * 10) + 70
            }});
            setLoading({...loading, oxygen: false});
        }, 5000);

    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}} onLayout={onLayout}>
            <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={{flexDirection: "row", padding: 8, margin: 8}}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <View style={{justifyContent: "center", alignItems: "center"}}>
                            <FontAwesomeIcon name="chevron-left" color={PRIMARY_COLOR} size={24}/>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <Text style={{color: PRIMARY_COLOR, fontSize: 24}}>
                            Vitals
                        </Text>
                    </View>
                    <FontAwesomeIcon name="chevron-left" color={PRIMARY_COLOR} size={30} style={{display: "none"}}/>
                </View>
                <TouchableWithoutFeedback style={{flex: 1}} onPress={() => captureTemperature()}>
                    <View style={{flex: 1, backgroundColor: "#DADADA", margin: 16, flexDirection: "row", borderRadius: 16, minHeight: 150}}>
                        <View style={{flexDirection: "row", flex: 2, alignItems: "center", justifyContent: "center", marginHorizontal: 16}}>
                            <View style={{flex: 1}}>
                                <FontAwesomeIcon name="thermometer-half" color={PRIMARY_COLOR} size={30}/>
                            </View>
                            <View style={{flex: 2,  alignItems: "center", justifyContent: "center"}}>
                                <Text style={{color: "black", marginLeft: 8, fontWeight: 'bold'}}>Body</Text>
                            </View>
                        </View>
                        <View style={{flex: 8, flexDirection: "row"}}>
                            {
                                data.temperature == 0 && !loading.temperature ?
                                (
                                    <View style={{position: "absolute", height: "100%", width: "100%", borderRadius: 16, justifyContent: "center", alignItems: "center", backgroundColor: PRIMARY_COLOR}}>
                                        <Text style={{color: "white", marginHorizontal: 16, textAlign: "center"}}> Wear Thermometer to view Temperature </Text>
                                    </View>
                                )
                                :
                                null
                            }
                            {
                                loading.temperature ? 
                                (
                                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                                        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
                                    </View>
                                ):
                                null
                            }
                            <View style={{flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", marginHorizontal: 16}}>
                                <View style={{flex: 1, justifyContent: "flex-end", alignItems: "flex-end",}}>
                                    <Text style={{color: data.temperature == 0 && !loading.temperature ? "#FAFAFA" : PRIMARY_COLOR, fontWeight: "bold", fontSize: 48, opacity: data.temperature == 0 && !loading.temperature ? 0.3 : 1}}> 
                                            {data.temperature}
                                        </Text>
                                </View>
                                <View style={{justifyContent: "center", alignItems: "center"}}>
                                    <Text>&deg;F</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{flex: 1}} onPress={() => captureBlood()}>
                    <View style={{flex: 1, backgroundColor: "#DADADA", margin: 16, flexDirection: "row", borderRadius: 16, minHeight: 150}}>
                        <View style={{flexDirection: "row", flex: 2, alignItems: "center", justifyContent: "center", marginHorizontal: 16}}>
                            <View style={{flex: 1}}>
                                <FontAwesomeIcon name="tint" color={PRIMARY_COLOR} size={30}/>
                            </View>
                            <View style={{flex: 2,  alignItems: "center", justifyContent: "center"}}>
                                <Text style={{color: PRIMARY_COLOR, marginLeft: 8, fontWeight: 'bold'}}>Blood</Text>
                            </View>
                        </View>
                        <View style={{flex: 8, flexDirection: "row"}}>
                            {
                                data.blood == 0 && !loading.blood ?
                                (
                                    <View style={{position: "absolute", height: "100%", width: "100%", borderRadius: 16, justifyContent: "center", alignItems: "center", backgroundColor: PRIMARY_COLOR}}>
                                        <Text style={{color: "white", marginHorizontal: 16, textAlign: "center"}}> Wear blood pressure monitor to view Blood Press </Text>
                                    </View>
                                )
                                :
                                null
                            }
                            {
                                loading.blood ? 
                                (
                                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                                        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
                                    </View>
                                ):
                                null
                            }

                            <View style={{flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", marginHorizontal: 16}}>
                                <View style={{flex: 1, justifyContent: "flex-end", alignItems: "flex-end",}}>
                                    <Text style={{color: data.blood == 0 && !loading.blood ? "#FAFAFA" : PRIMARY_COLOR, fontWeight: "bold", fontSize: 48, opacity: data.blood == 0 && !loading.blood ? 0.3 : 1}}> 
                                        {data.blood}
                                    </Text>
                                </View>
                                <View style={{justifyContent: "center", alignItems: "center"}}>
                                    <Text>mmHg</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{flex: 1}} onPress={() => captureOxygen()}>
                    <View style={{flex: 1, backgroundColor: "#DADADA", margin: 16, flexDirection: "row", borderRadius: 16, minHeight: 150}}>
                        <View style={{flexDirection: "row", flex: 2, alignItems: "center", justifyContent: "center", marginHorizontal: 16}}>
                            <View style={{flex: 1}}>
                                <FontAwesomeIcon name="heartbeat" color={PRIMARY_COLOR} size={30}/>
                            </View>
                            <View style={{flex: 2,  alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
                                <Text style={{color: PRIMARY_COLOR, marginLeft: 8, fontWeight: 'bold'}}>SpO</Text>
                                <Text style={{color: PRIMARY_COLOR, fontSize: 8, fontWeight: 'bold', marginTop: 4}}>2</Text>
                            </View>
                        </View>
                        <View style={{flex: 8, flexDirection: "row"}}>
                            {
                                data.oxygen.pr == 0 && !loading.oxygen ?
                                (
                                    <View style={{position: "absolute", height: "100%", width: "100%", borderRadius: 16, justifyContent: "center", alignItems: "center", backgroundColor: PRIMARY_COLOR}}>
                                        <Text style={{color: "white", marginHorizontal: 16, textAlign: "center"}}> Wear Oximeter to view SpO2 and PB </Text>
                                    </View>
                                )
                                :
                                null
                            }
                            {
                                loading.oxygen ? 
                                (
                                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                                        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
                                    </View>
                                ):
                                null
                            }
                            <View style={{flex: 4, flexDirection: "row", justifyContent: "center", alignItems: "center", justifyContent: "space-around", marginHorizontal: 16}}>
                                <View style={{flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", marginHorizontal: 4}}>
                                    <View style={{flex: 1, justifyContent: "flex-end", alignItems: "flex-end",}}>
                                        <Text style={{color: data.oxygen.pr == 0 && !loading.oxygen ? "#FAFAFA" : PRIMARY_COLOR, fontWeight: "bold", fontSize: 48, opacity: data.oxygen.pr == 0 && !loading.oxygen ? 0.3 : 1}}> 
                                            {data.oxygen.spo2}
                                        </Text>
                                    </View>
                                    <View style={{justifyContent: "center", alignItems: "center"}}>
                                        <Text>%</Text>
                                    </View>
                                </View>
                                <View style={{flex: 2, flexDirection: "row", alignItems: "center", marginHorizontal: 4}}>
                                    <View style={{flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
                                        <Text style={{marginHorizontal: 4, fontWeight: "bold", color: PRIMARY_COLOR }}>PR</Text>
                                        <Text style={{color: data.oxygen.pr == 0 && !loading.oxygen ? "#FAFAFA" : PRIMARY_COLOR, fontWeight: "bold", fontSize: 48, opacity: data.oxygen.pr == 0 && !loading.oxygen ? 0.3 : 1, marginHorizontal: 4}}> 
                                            {data.oxygen.pr}
                                        </Text>
                                    </View>
                                    <View style={{justifyContent: "flex-end", alignItems: "flex-end"}}>
                                        <Text>bpm</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{margin: 16, marginBottom: 32}}>
                    <Button mode="contained" onPress={() => submit()} style={{borderRadius: 16}} >
                        Complete
                    </Button>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}