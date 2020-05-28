/**
 * Content type metadata.
 * @module components/manage/Controlpanels/ContentTypeMetadata
 */

import { createContent, getSchema } from '@plone/volto/actions';
import { Icon, Sidebar, Toast, Toolbar } from '@plone/volto/components';
import FormBuilder from '@plone/volto/components/manage/Form/SchemaBuilder';
import { Helmet } from '@plone/volto/helpers';
import clearSVG from '@plone/volto/icons/clear.svg';
import saveSVG from '@plone/volto/icons/save.svg';
import PropTypes from 'prop-types';
import qs from 'query-string';
import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { Portal } from 'react-portal';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { compose } from 'redux';
import { Button } from 'semantic-ui-react';

const messages = defineMessages({
  metadata: {
    id: 'metadata {type}',
    defaultMessage: 'metadata {type}',
  },
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
});

/**
 * ContentTypeMetadata class.
 * @class ContentTypeMetadata
 * @extends Component
 */
class ContentTypeMetadata extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    createContent: PropTypes.func.isRequired,
    getSchema: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    schema: PropTypes.objectOf(PropTypes.any),
    content: PropTypes.shape({
      // eslint-disable-line react/no-unused-prop-types
      '@id': PropTypes.string,
      '@type': PropTypes.string,
    }),
    returnUrl: PropTypes.string,
    createRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    schemaRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    type: PropTypes.string,
    location: PropTypes.objectOf(PropTypes.any),
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    schema: null,
    content: null,
    returnUrl: '/controlpanel/dexterity-types',
    type: 'Default',
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);

    // console.log('ContentTypeMetadata props', props);
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getSchema(this.props.type);
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('prevProps', prevProps);
    // console.log('this.props', this.props);
    // console.log('this.state', this.state);
    // console.log('prevState', prevState);

    if (this.props.createRequest.error) {
      toast.error(
        <Toast
          error
          title={this.props.intl.formatMessage(messages.error)}
          content={`${this.props.createRequest.error.status}:  ${this.props.createRequest.error.response?.body?.message}`}
        />,
      );
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    // console.log('this.props', this.props);
    // console.log('this.state', this.state);
    return (
      <div id="page-types-control-panel-metadata">
        <Helmet
          title={this.props.intl.formatMessage(messages.metadata, {
            type: this.props.type,
          })}
        />
        {this.props.schema ? (
          <FormBuilder
            ref={this.form}
            schema={this.props.schema}
            onSubmit={this.onSubmit}
            hideActions
            visual
            pathname={this.props.pathname}
            title={this.props.intl.formatMessage(messages.metadata, {
              type: this.props.type,
            })}
            loading={this.props.createRequest.loading}
          />
        ) : null}
        <Portal node={__CLIENT__ && document.getElementById('sidebar')}>
          <Sidebar />
        </Portal>
        <Portal node={__CLIENT__ && document.getElementById('toolbar')}>
          <Toolbar
            pathname={this.props.pathname}
            hideDefaultViewButtons
            inner={
              <>
                <Button
                  id="toolbar-save"
                  className="save"
                  aria-label={this.props.intl.formatMessage(messages.save)}
                  onClick={() => this.form.current.onSubmit()}
                  // disabled={this.props.updateRequest.loading}
                  // loading={this.props.updateRequest.loading}
                >
                  <Icon
                    name={saveSVG}
                    className="circled"
                    size="30px"
                    title={this.props.intl.formatMessage(messages.save)}
                  />
                </Button>
                <Button
                  className="cancel"
                  aria-label={this.props.intl.formatMessage(messages.cancel)}
                  onClick={() => this.onCancel()}
                >
                  <Icon
                    name={clearSVG}
                    className="circled"
                    size="30px"
                    title={this.props.intl.formatMessage(messages.cancel)}
                  />
                </Button>
              </>
            }
          />
        </Portal>
      </div>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      createRequest: state.content.create,
      schemaRequest: state.schema,
      content: state.content.data,
      schema: state.schema.schema,
      pathname: props.location.pathname,
      returnUrl: qs.parse(props.location.search).return_url,
      type: props.match.params.id,
    }),
    { createContent, getSchema },
  ),
)(ContentTypeMetadata);
