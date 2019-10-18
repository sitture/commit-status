import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './Filter.css';

export default class Filter extends Component {
    render = () => {
        return (
            <div className="tab-filter">
                <Tabs>
                    <TabList>
                        <Tab>All</Tab>
                        <Tab>Unhealthy</Tab>
                    </TabList>

                    <TabPanel>
                        <h2>Content</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>More content</h2>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}