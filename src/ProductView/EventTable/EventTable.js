import React, { Component } from 'react';
import EventTableHeader from './EventTableHeader/EventTableHeader.js';
import EventTableRow from './EventTableRow/EventTableRow.js';

class EventTable extends Component {
    
    testFilter(currentEvent) {
        // every is equivalent to logical and over an array
        return this.props.filter.every((filter) => {
            return this.testFilterArguments(currentEvent, filter);
        });
    }

    testFilterArguments(currentEvent, currentFilter) {
        if (!currentFilter.value) {
            return true;
        }
        let columnsToBeSearched = this.props.header;
        if(currentFilter.column) {
          columnsToBeSearched = columnsToBeSearched.filter((eventPropertyKey) => {
            return this.doesContain(eventPropertyKey.name, currentFilter.column);
          });
        }

        return columnsToBeSearched.some((eventPropertyKey) => {
            const splittedFilterValues = currentFilter.value.split(",");
            for (var i = 0; i < splittedFilterValues.length; i++) {
                if (this.doesContain(currentEvent[eventPropertyKey.name], splittedFilterValues[i].trim())) {
                    return true;
                }
            }
        });
    }

    doesContain(baseValue, subValue) {
      return (baseValue.toString().toLowerCase().indexOf(subValue.toString().toLowerCase()) > -1);
    }

    render() {
        return (
            <div className="event-table-container">
                <table className="table">
                    <EventTableHeader eventTypeAttributes={this.props.header}/>
                    <tbody>
                    {this.props.events.map((event, index) => {
                        if(this.testFilter(event)) {
                            return (
                                <EventTableRow 
                                    key={index} 
                                    id={index} 
                                    event={event}
                                    eventTypeAttributes={this.props.header}/>
                            );
                        } else {
                            return false;
                        }
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
} export default EventTable;
