import React, {Component} from 'react';
import {render} from 'react-dom';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import 'assets/css/components/hotelslist.css';

const SortableItem = sortableElement(({value}) => 
  <ListItem button divider>
    <ListItemIcon>
        <DragHandleIcon/>
    </ListItemIcon>
    <ListItemText primary={value} />
  </ListItem>
  
);

const SortableContainer = sortableContainer(({children}) => {
  return <List className='list'>{children} </List>;
});

export default class SortableComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SortableContainer onSortEnd={this.props.onSortEnd} transitionDuration={300} helperClass='sortableHelper' lockAxis="y" >
        {this.props.items.map((value, index) => (
          <SortableItem key={`item-${value}`} index={index} value={value} />
        ))}
      </SortableContainer>
    );
  }
}