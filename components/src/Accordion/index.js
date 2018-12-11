import React from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import styled from 'styled-components';
import { TABLET_MQ, TABLET_MIN_WIDTH } from '../atoms';
import If from '../If';
import Item from './Item';

const OuterWrapper = styled.div`
  ${TABLET_MQ} {
    display: flex;
  }
`;

const Column = styled.div`
  flex: 1;
  :nth-child(odd) {
    padding-right: 0.5em;
  }
  :nth-child(even) {
    padding-left: 0.5em;
  }
  :last-child {
    padding-right: 0;
  }
`;

class Accordion extends React.PureComponent {
  state = {
    expanded: [],
  };

  expand = ({ id }) => {
    this.setState((state) => {
      if (!state.expanded.includes(id)) {
        return {
          expanded: [...state.expanded, id],
        };
      }
      const index = state.expanded.indexOf(id);
      return {
        expanded: [
          ...state.expanded.slice(0, index),
          ...state.expanded.slice(index + 1),
        ],
      };
    });
  };

  render() {
    const { items, viewport, colHeight } = this.props;
    const { length } = items;
    const { expanded } = this.state;
    return (
      <OuterWrapper>
        <If case={viewport >= TABLET_MIN_WIDTH}>
          {range(0, Math.ceil(length / colHeight)).map((column) => (
            <Column key={column}>
              {items
                .slice(column * colHeight, (column + 1) * colHeight)
                .map(({ title, body, id }) => (
                  <Item
                    key={id}
                    onClick={this.expand}
                    id={id}
                    title={title}
                    expanded={expanded.includes(id)}
                  >
                    {body}
                  </Item>
                ))}
            </Column>
          ))}
        </If>
        <If case={viewport < TABLET_MIN_WIDTH}>
          <Column>
            {items.map(({ title, body, id }) => (
              <Item
                key={id}
                onClick={this.expand}
                id={id}
                title={title}
                expanded={expanded.includes(id)}
              >
                {body}
              </Item>
            ))}
          </Column>
        </If>
      </OuterWrapper>
    );
  }
}

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.any.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  viewport: PropTypes.number.isRequired,
  colHeight: PropTypes.number,
};
Accordion.defaultProps = {
  colHeight: 4,
};

export default Accordion;
