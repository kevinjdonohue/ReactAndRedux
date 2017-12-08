import expect from 'expect';
import { authorsFormattedForDropdown } from './authorSelectors';

describe('authorSelectors', () => {
  describe('authorsFormattedForDropdown', () => {
    it('should return author data formatted for use in a dropdown', () => {
      // arrange
      const authors = [
        {
          id: 'cory-house',
          firstName: 'Cory',
          lastName: 'House',
        },
      ];

      const expectedFormattedAuthors = [
        {
          value: 'cory-house',
          text: 'Cory House',
        },
      ];

      // act
      const actualFormattedAuthors = authorsFormattedForDropdown(authors);

      // assert
      expect(actualFormattedAuthors).toEqual(expectedFormattedAuthors);
    });
  });
});
