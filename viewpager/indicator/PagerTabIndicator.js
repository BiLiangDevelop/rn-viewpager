/**
 * Created by tangzhibin on 16/5/11.
 */

'use strict'
import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity, ViewPropTypes} from 'react-native'
import IndicatorViewPager from '../IndicatorViewPager'
import PropTypes from 'prop-types';

export default class PagerTabIndicator extends Component {
    static propTypes = {
        ...ViewPropTypes,
        initialPage: PropTypes.number,
        pager: PropTypes.instanceOf(IndicatorViewPager),
        tabs: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
            iconSource: ViewPropTypes.source,
            selectedIconSource: ViewPropTypes.source
        })).isRequired,
        itemStyle: ViewPropTypes.style,
        selectedItemStyle: ViewPropTypes.style,
        iconStyle: ViewPropTypes.style,
        selectedIconStyle: ViewPropTypes.style,
        textStyle: ViewPropTypes.style,
        selectedTextStyle: ViewPropTypes.style
    }

    static defaultProps = {
        tabs: []
    }

    state = {
        selectedIndex: this.props.initialPage
    }

    render() {
        let {
            tabs, pager, style, itemStyle, selectedItemStyle, iconStyle,
            selectedIconStyle, textStyle, selectedTextStyle
        } = this.props
        if (!tabs || tabs.length === 0) return null

        let tabsView = tabs.map((tab, index) => {
            let isSelected = this.state.selectedIndex === index
            return (
                <TouchableOpacity
                    style={[styles.itemContainer, isSelected ? selectedItemStyle : itemStyle]}
                    activeOpacity={0.6}
                    key={index}
                    onPress={() => {
                        !isSelected && pager.setPage(index)
                    }}
                >
                    <Image
                        style={[styles.image, isSelected ? selectedIconStyle : iconStyle]}
                        source={isSelected ? tab.selectedIconSource : tab.iconSource}
                    />
                    <Text
                        style={[isSelected ? styles.textSelected : styles.text, isSelected ? selectedTextStyle : textStyle]}
                    >
                        {tab.text}
                    </Text>
                </TouchableOpacity>
            )
        })
        return (
            <View style={[styles.container, style]}>
                {tabsView}
            </View>
        )
    }

    onPageSelected(e) {
        this.setState({selectedIndex: e.position})
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 8,
        paddingBottom: 4,
        borderTopWidth: 0.5,
        borderTopColor: '#E0E0E0',
        backgroundColor: '#F7F7F7'
    },
    itemContainer: {
        alignItems: 'center',
        flex: 1
    },
    image: {},
    text: {
        marginTop: 4,
        fontSize: 11,
        color: '#999999'
    },
    textSelected: {
        marginTop: 4,
        fontSize: 11,
        color: '#3584F6'
    }
})