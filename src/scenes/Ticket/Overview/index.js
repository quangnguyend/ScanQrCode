import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image
} from 'react-native';
import { TextCustom, TextInputCustom, ButtonCustom, Dropdown, DatePicker, Camera } from './../../../components'

const propsDropdown = {
    defaultValue: { value: 5, label: 'Kebumen' },
    options: [
        { value: 1, label: 'Bandung' },
        { value: 2, label: 'Surabaya' },
        { value: 3, label: 'Palembang' },
        { value: 4, label: 'Jakarta' },
    ],
    label: 'EVENT',
    animationType: 'none',
};

export default class Overview extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../../assets/images/ticket.png')}
                style={[{ width: 75, height: 75 }]}
            />
        ),
    }
    constructor(props) {
        super(props)
        this.state = {
            date: '',
            selectedOption: propsDropdown.defaultValue || { value: 0, label: 'Pilih Kota' },
            isShowingOptions: false
        }
    }

    onEntry = () => {
        console.log(this.props)
        this.props.navigation.navigate('Entry', { title: 'ENTRY', typeScannerCode: 1 });
    }
    onViewInfo = () => {
        console.log(this.props)
        this.props.navigation.navigate('Entry', { title: 'VIEW INFO', typeScannerCode: 2 });
    }

    _onShow = (value) => {
        this.setState({
            isShowingOptions: value,
        });
    }
    _onSelect = (item, isShow) => {
        this.setState({
            isShowingOptions: isShow,
            selectedOption: item,
        });
    }
    render() {
        let { isShowingOptions, selectedOption } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <TextCustom>SCAN QR CODE</TextCustom>
                    <View style={styles.row}>
                        <ButtonCustom width={100} onPress={this.onEntry}>ENTRY</ButtonCustom>
                        <ButtonCustom width={100} onPress={this.onViewInfo}>VIEW INFO</ButtonCustom>
                    </View>
                    <TextCustom>IF TICKET SCANNING FAILS, TYPE THE TICKET ID TO ADMIT ENTRY OR VIEW INFO</TextCustom>
                    <TextInputCustom />
                    <View style={styles.floatRight}>
                        <ButtonCustom width={90} padding={10} fontSize={13}>ENTRY</ButtonCustom>
                        <ButtonCustom width={90} padding={10} fontSize={13}>VIEW INFO</ButtonCustom>
                    </View>
                    <TextCustom>EVENT YOU ARE SCANNING IN</TextCustom>
                    <TextCustom>Current Event: Auction</TextCustom>
                    <View style={styles.row}>
                        <View style={[styles.rowItem, { paddingRight: 10 }]}>
                            <DatePicker
                                style={{ width: '100%' }}
                                date={this.state.date}
                                mode="date"
                                placeholder="placeholder"
                                format="YYYY-MM-DD"
                                //minDate="2016-05-01"
                                //maxDate="2016-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                iconSource={require('./../../../assets/images/arrow-down.png')}
                                onDateChange={(date) => { this.setState({ date: date }); }}
                            /></View>
                        <View style={[styles.rowItem, { paddingLeft: 10 }]}>
                            <Dropdown {...propsDropdown}
                                onSelect={this._onSelect.bind(this)}
                                onShow={this._onShow.bind(this)}
                                isShowingOptions={isShowingOptions}
                                selectedOption={selectedOption}
                            />
                        </View>
                    </View>
                    <View style={styles.floatRight}>
                        <ButtonCustom>SUBMIT</ButtonCustom>
                    </View>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 0
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        paddingBottom: 10,
        paddingTop: 10,
        justifyContent: 'center'
    },
    floatRight: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingBottom: 10,
        paddingTop: 10
    },
    rowItem: {
        width: '50%'
    }
})