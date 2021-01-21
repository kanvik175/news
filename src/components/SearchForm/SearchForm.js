import React from 'react';

import './SearchForm.css';

function SearchForm() {
  return (
    <form className='search-form'>
      <input type='text' name='search' className='search-form__input' placeholder='Введите тему новости' />
      <button className='search-form__button'>Искать</button>
    </form>
  );
}

export default SearchForm;
