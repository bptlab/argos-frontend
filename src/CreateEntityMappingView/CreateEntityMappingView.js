import React from 'react';
import {connect, PromiseState} from 'react-refetch';
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import {Col, Container, Row} from "react-grid-system";
import {MenuItem, RaisedButton, SelectField} from "material-ui";
import IconSave from "material-ui/svg-icons/content/save";
import IconCancel from "material-ui/svg-icons/navigation/cancel";
import Header from './../Header';
import { css } from 'aphrodite';

import config from "../config/config";
import AppStyles from "../AppStyles";

class CreateEntityMappingView extends ConnectionComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedEventTypeId: null,
            selectedEntityTypeId: null
        };
        this.handleEventTypeChange = this.handleEventTypeChange.bind(this);
        this.handleEntityTypeChange = this.handleEntityTypeChange.bind(this);
    }

    getAllEntityTypes(hierarchy) {

        if (hierarchy) {
            let allEntities = [];
            hierarchy.forEach((hierarchyLayer) => {
                hierarchyLayer.forEach((entityType) => {
                    allEntities = allEntities.concat(entityType);
                });
            });
            return allEntities;
        }
        return [];
    }

    handleEventTypeChange(event, index, value) {
        this.setState({selectedEventTypeId: value});
    }

    handleEntityTypeChange(event, index, value) {
        this.setState({selectedEntityTypeId: value});
    }

    render() {
        const allFetches = PromiseState.all([this.props.eventTypes, this.props.entityTypeHierarchy]);
        const eventTypes = this.props.eventTypes.value;
        const entityTypes = this.getAllEntityTypes(this.props.entityTypeHierarchy.value);
        const connectionIncomplete = super.render(allFetches);
        if(connectionIncomplete) {
            return connectionIncomplete;
        }
        return (
            <div>
                <Header title={"Create Entity Mapping"}/>
                <div className={AppStyles.elementMarginTop}>
                    <Container>
                        <Row>
                            <Col md={6}>
                                <SelectField
                                    value={this.state.selectedEventTypeId}
                                    onChange={this.handleEventTypeChange}
                                    floatingLabelText="Select Event Type"
                                    fullWidth={true}>
                                    {eventTypes.map(
                                        (eventType, key) => {
                                            return <MenuItem
                                                        key={key}
                                                        value={eventType.Id}
                                                        primaryText={eventType.Name}/>;
                                        })
                                    }
                                </SelectField>
                            </Col>
                            <Col md={6}>
                                <SelectField
                                    value={this.state.selectedEntityTypeId}
                                    onChange={this.handleEntityTypeChange}
                                    floatingLabelText="Select Entity Type"
                                    fullWidth={true}>
                                    {entityTypes.map(
                                        (entityType, key) => {
                                            return <MenuItem
                                                key={key}
                                                value={entityType.Id}
                                                primaryText={entityType.Name}/>;
                                        })
                                    }
                                </SelectField>
                            </Col>
                        </Row>
                        <div className={css(AppStyles.textAlignCenter)}>
                            <RaisedButton
                                label="Abort"
                                icon={<IconCancel/>}
                                className={css(AppStyles.marginAllSites)}
                                secondary={true}
                            />
                            <RaisedButton
                                label="Save"
                                icon={<IconSave/>}
                                className={css(AppStyles.marginAllSites)}
                                primary={true}
                            />
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}

export default connect.defaults({fetch: ConnectionComponent.switchFetch})(props => ({
    eventTypes:  config.backendRESTRoute + `/eventtypes`,
    entityTypeHierarchy: config.backendRESTRoute + `/entitytype/hierarchy`
}))(CreateEntityMappingView);
