import React from 'react';
import renderer from 'react-test-renderer';
import Footer from '../src/components/Footer';

it('renders header correctly on landing page', function() {
  var tree = renderer.create(
    <Footer />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});