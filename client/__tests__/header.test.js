import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../src/components/Header';

it('renders header correctly on landing page', function() {
  var user = {
    "id": "abc97872-3e90-4c96-bb2f-90f82af052d5",
    "name": "Mikhail Lindblad",
    "groups": ["administrators"],
    "projects": ["project_1"]
  };
  var location =  {"pathname": "/"};
  var tree = renderer.create(
    <Header user={user} project={undefined} location={location} title={undefined}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});