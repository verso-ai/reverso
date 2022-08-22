import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as ReversoElement } from '../stories/ReversoElement.stories';

describe('Thing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ReversoElement type="text" name="test" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
