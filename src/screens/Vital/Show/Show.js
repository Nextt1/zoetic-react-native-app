import React, {useEffect, useState} from 'react';
import {View, Text, RefreshControl} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import ActionButton from 'react-native-action-button';
import { Grid, LineChart, YAxis } from 'react-native-svg-charts'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {PRIMARY_COLOR} from './../../../utilities';
import { TouchableRipple } from 'react-native-paper';
import { homeAPI } from '../../../api';

export default Add = ({navigation}) => {

    const [refreshFlag, setRefreshFlag] = useState(1);
    const [dateString, setDateString] = useState();
    const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));
    const [dates, setDates] = useState([]);
    const [temperateData, setTemperatureData] = useState([98, 98.3, 97.8, 98.5, 97, 97.9, 97.6, 98.3]);
    const [bloodData, setBloodData] = useState([60, 90, 100, 120, 80, 60, 40, 100, 120, 90, 100]);
    const [oximeterData, setOximeterData] = useState([78, 78, 78.5, 77.5, 79, 77, 78.3, 77.5, 78.1, 78, 78, 78, 78, 78.5, 77.5, 79, 77, 78.3, 77.5, 78.1, 78, 78, 78, 78, 78.5, 77.5, 79, 77, 78.3, 77.5, 78.1, 78, 78]);
    const [oxygenSpo2, setOxygenSpo2] = useState(0);

    useEffect(() => {
        setDateString(moment().format("MMMM D, YYYY").toUpperCase());
        let d = [];

        for(let i=-3; i < 4; i++){
            let date = moment().add(i, 'days');
            d.push( { date: date.format("DD"), day: date.format("ddd"), fullDate: date.format("YYYY-MM-DD")});
        }

        setDates(d);

        const unsubscribe = navigation.addListener('focus', () => {
            _refresh();
        });
        
        return unsubscribe;
    }, [navigation]);

    useEffect( () => {
        _refresh();
    }, []);

    const _refresh = async () => {
        fetchData();
    }

    useEffect( () => {
        fetchData();
    }, [currentDate]);

    const fetchData = async () => {
        setRefreshFlag(1);
        const res = await homeAPI(currentDate);
        setTemperatureData(res.data.temperature);
        setBloodData(res.data.blood);
        setOximeterData(res.data.oxygenPr);
        setOxygenSpo2(res.data.oxygenSpo2);
        setRefreshFlag(0);
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: PRIMARY_COLOR}}>
            <KeyboardAwareScrollView
                contentContainerStyle={{flexGrow: 1}}
                refreshControl={
                    <RefreshControl tintColor="white" colors={[PRIMARY_COLOR]} refreshing={refreshFlag == 1 ? true: false} onRefresh={_refresh} />
                }
            >
                <View style={{flex: 1}}>
                    <View style={{flexDirection: "column", flex: 1, paddingHorizontal: 16, paddingVertical: 8, marginBottom: 24}}>
                        <View style={{flexDirection: "row", backgroundColor: PRIMARY_COLOR}}>
                            <FontAwesomeIcon name="bars" color="white" size={30}/>
                            <View style={{flex: 1, alignItems: "center", justifyContent: "center", color: "white"}}>
                                <Text style={{color: "white", fontSize: 20, fontWeight: 'bold'}}>Vitals</Text>
                            </View>
                            <FontAwesomeIcon name="plus" color="white" size={30} />
                        </View>
                        <View style={{flex: 1, paddingTop: 8}}>
                            <Text style={{color: "white", fontWeight: 'bold'}}>{dateString}</Text>
                            <Text style={{color: "white", fontWeight: 'bold', fontSize: 20, paddingTop: 8}}>How are you feeling today?</Text>
                        </View>
                    </View>
                    <View style={{flex: 8, backgroundColor: "white"}}>
                        <View style={{flexDirection: "row", backgroundColor: "#EAEAEA", padding: 16, margin: 16, marginTop: -16, borderRadius: 16}}>
                            {
                                dates.map(eachDate => {
                                    return (
                                        <TouchableRipple onPress={() => setCurrentDate(eachDate.fullDate)} style={{flex: 1}}>
                                            <View style={{flex: 1, flexDirection: "column", justifyContent: "center", margin: 6}}>
                                                <Text style={{paddingVertical: 8, color: "#AAAAAA", textAlign: "center"}}>{eachDate.day}</Text>
                                                {eachDate.fullDate == currentDate ? 
                                                    <Text style={{paddingVertical: 8, backgroundColor: PRIMARY_COLOR, borderRadius: 32, textAlign: "center", color: "white"}}>{eachDate.date}</Text>
                                                    :
                                                    <Text style={{paddingVertical: 8, textAlign: "center", color: "black"}}>{eachDate.date}</Text>
                                                }
                                            </View>
                                        </TouchableRipple>
                                    );
                                })
                            }
                        </View>
                        <View style={{flex: 1, flexDirection: "row", margin: 16}}>
                            <View style={{flex: 1, marginRight: 8}}>
                                <View style={{flex: 2, backgroundColor: "#FC2271", borderRadius: 16, marginVertical: 8}}>
                                    <View style={{flexDirection: "row", padding: 16, alignItems: "center"}}>
                                        <FontAwesomeIcon name="thermometer-half" color="white" size={30}/>
                                        <Text style={{color: "white", marginLeft: 8, fontWeight: 'bold'}}>Temperature</Text>
                                    </View>
                                    <View style={{ flex:1, minHeight: 75, flexDirection: 'row', paddingHorizontal: 8}}>
                                        {
                                            temperateData.length == 0 ?
                                            (
                                                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                                                    <Text style={{color: "white"}}>No Data Available</Text>
                                                </View>
                                            ):
                                            (
                                                <>
                                                    <YAxis
                                                        data={temperateData}
                                                        contentInset={{top: 20, bottom: 20}}
                                                        svg={{
                                                            fill: 'white',
                                                            fontSize: 10,
                                                        }}
                                                        numberOfTicks={2}
                                                        showGrid={false}
                                                        formatLabel={(value) => `${value}`}
                                                        />
                                                    <LineChart
                                                        showGrid={false}
                                                        style={{ flex: 1}}
                                                        data={temperateData}
                                                        svg={{ stroke: 'rgb(255, 255, 255)' }}
                                                        contentInset={{top: 20, bottom: 20}}
                                                        animate={true}
                                                        animationDuration={1000}
                                                    >
                                                        <Grid direction={Grid.Direction.VERTICAL} />
                                                    </LineChart>
                                                </>
                                            )
                                        }
                                    </View>
                                    <View style={{flexDirection: "row", paddingVertical: 8, marginHorizontal: 16}}>
                                        <View style={{flex: 1, justifyContent: "center", alignItems: "flex-end"}}>
                                            <View style={{flexDirection: "row", marginTop: -8}}>
                                                <Text style={{color: "white", fontWeight: 'bold', marginLeft: 8, fontSize: 36}}>{temperateData.length > 0 ? temperateData[temperateData.length - 1] : 0}</Text>
                                                <View style={{justifyContent: "flex-end", alignItems: "flex-end", marginBottom: 8}}>
                                                    <Text style={{color: "white", fontSize: 10}}>&deg;F</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex: 3, backgroundColor: PRIMARY_COLOR, borderRadius: 16, marginVertical: 8, paddingLeft: 8}}>
                                    <View style={{flexDirection: "row", padding: 16, alignItems: "center"}}>
                                        <FontAwesomeIcon name="heartbeat" color="white" size={30}/>
                                        <Text style={{color: "white", marginLeft: 8, fontWeight: 'bold'}}>Oximeter</Text>
                                    </View>
                                    <View style={{flex: 1, minHeight: 100, flexDirection: 'row' }}>
                                        {
                                            oximeterData.length == 0 ?
                                            (
                                                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                                                    <Text style={{color: "white"}}>No Data Available</Text>
                                                </View>
                                            ):
                                            (
                                                <>
                                                    <YAxis
                                                        showGrid={false}
                                                        data={oximeterData}
                                                        contentInset={{top: 20, bottom: 20}}
                                                        svg={{
                                                            fill: 'white',
                                                            fontSize: 10,
                                                        }}
                                                        numberOfTicks={3}
                                                        formatLabel={(value) => `${value}`}
                                                    />
                                                    <LineChart
                                                        showGrid={false}
                                                        style={{ flex: 1 }}
                                                        data={oximeterData}
                                                        svg={{ stroke: 'rgb(255, 255, 255)' }}
                                                        contentInset={{top: 20, bottom: 20}}
                                                        animate={true}
                                                        animationDuration={1000}
                                                    >
                                                        <Grid direction={Grid.Direction.VERTICAL}/>
                                                    </LineChart>
                                                </>
                                            )
                                        }
                                    </View>
                                    <View style={{flexDirection: "row", paddingVertical: 8}}>
                                        <View style={{flex: 1, justifyContent: "center", alignItems: "flex-start"}}>
                                            <Text style={{color: "white", marginLeft: 8, fontWeight: 'bold', fontSize: 14}}>SpO2</Text>
                                            <View style={{flexDirection: "row", marginTop: -8}}>
                                                <Text style={{color: "white", fontWeight: 'bold', marginLeft: 8, fontSize: 36}}>{oxygenSpo2}</Text>
                                                <View style={{justifyContent: "flex-end", alignItems: "flex-end", marginBottom: 8}}>
                                                    <Text style={{color: "white", fontSize: 10}}>%</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{flex: 1, justifyContent: "center", alignItems: "flex-start"}}>
                                            <Text style={{color: "white", marginLeft: 8, fontWeight: 'bold', fontSize: 14}}>PR</Text>
                                            <View style={{flexDirection: "row", marginTop: -8}}>
                                                <Text style={{color: "white", fontWeight: 'bold', marginLeft: 8, fontSize: 36}}>{oximeterData.length > 0 ? oximeterData[oximeterData.length - 1] : 0}</Text>
                                                <View style={{justifyContent: "flex-end", alignItems: "flex-end", marginBottom: 8}}>
                                                    <Text style={{color: "white", fontSize: 10}}>bpm</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{flex: 1, marginLeft: 8}}>
                                <View style={{flex: 3, backgroundColor: "#08BEC6", borderRadius: 16, marginVertical: 8}}>
                                    <View style={{flexDirection: "row", padding: 16, alignItems: "center"}}>
                                        <FontAwesomeIcon name="tint" color="white" size={30}/>
                                        <Text style={{color: "white", marginLeft: 8, fontWeight: 'bold'}}>Blood</Text>
                                    </View>
                                    <View style={{ flex: 1, minHeight: 250, flexDirection: 'row', paddingHorizontal: 16 }}>
                                        {
                                            bloodData.length == 0 ?
                                            (
                                                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                                                    <Text style={{color: "white"}}>No Data Available</Text>
                                                </View>
                                            ):
                                            (
                                                <>
                                                    <YAxis
                                                        showGrid={false}
                                                        data={bloodData}
                                                        contentInset={{top: 20, bottom: 20}}
                                                        svg={{
                                                            fill: 'white',
                                                            fontSize: 10,
                                                        }}
                                                        numberOfTicks={3}
                                                        formatLabel={(value) => `${value}`}
                                                    />
                                                    <LineChart
                                                        showGrid={false}
                                                        style={{ flex: 1}}
                                                        data={bloodData}
                                                        svg={{ stroke: 'rgb(255, 255, 255)' }}
                                                        contentInset={{top: 20, bottom: 20}}
                                                        animate={true}
                                                        animationDuration={1000}
                                                    >
                                                        <Grid direction={Grid.Direction.VERTICAL}/>
                                                    </LineChart>
                                                </>
                                            )
                                        }
                                    </View>
                                    <View style={{flexDirection: "row", paddingVertical: 8, marginHorizontal: 16}}>
                                        <View style={{flex: 1, justifyContent: "center", alignItems: "flex-end"}}>
                                            <View style={{flexDirection: "row", marginTop: -8}}>
                                                <Text style={{color: "white", fontWeight: 'bold', marginLeft: 8, fontSize: 36, marginTop: -8}}>{bloodData.length > 0 ? bloodData[bloodData.length - 1] : 0}</Text>
                                                <Text style={{color: "white", fontWeight: 'bold', marginLeft: 8, fontSize: 36}}>{bloodData.length > 0 ? "/70" : null}</Text>
                                                <View style={{justifyContent: "flex-end", alignItems: "flex-end", marginBottom: 8}}>
                                                    <Text style={{color: "white", fontSize: 10}}>mmHg</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex: 2, backgroundColor: "#EAEAEA", borderRadius: 16}}>
                                    <View style={{flexDirection: "row", padding: 16, alignItems: "center"}}>
                                        <FontAwesomeIcon name="tint" color="white" size={30}/>
                                        <Text style={{color: "white", marginLeft: 8, fontWeight: 'bold'}}>Extra Data</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
            <ActionButton
                size={90}
                onPress={() => { navigation.navigate("addVital") }}
                buttonColor="rgba(60, 40, 113,1)"
                buttonText="MEASURE NOW"
                style={{position: "absolute", bottom: -20 , right: 0}}
                buttonTextStyle={{textAlign: "center", fontSize: 16, color: "white", fontWeight: "bold"}}
            />
        </SafeAreaView>
    )
}