import './index1.css';
import axios from 'axios';

const searchVacancies = () => {
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.trim();

  if (searchTerm !== '') {
    const url = `https://api.hh.ru/vacancies?text=${encodeURIComponent(searchTerm)}`;

    axios.get(url)
      .then(response => {
        if (response.data && response.data.items && response.data.items.length > 0) {
          const vacancies = response.data.items;
          const vacanciesList = document.getElementById('vacancies-list');
          vacanciesList.innerHTML = '';

          vacancies.forEach(vacancy => {
            const vacancyItem = document.createElement('li');
            vacancyItem.classList.add('vacancy-item');

            const titleElement = document.createElement('h2');
            titleElement.classList.add('vacancy-title');
            titleElement.textContent = vacancy.name;

            const companyElement = document.createElement('p');
            companyElement.classList.add('vacancy-company');
            companyElement.textContent = `Компания: ${vacancy.employer.name}`;

            const salaryElement = document.createElement('p');
            salaryElement.classList.add('vacancy-salary');
            salaryElement.textContent = `Зарплата: ${vacancy.salary ? vacancy.salary.from : 'не указана'}`;

            const descriptionElement = document.createElement('p');
            descriptionElement.classList.add('vacancy-description');
            descriptionElement.textContent = `Описание: ${vacancy.snippet.requirement}`;

            vacancyItem.appendChild(titleElement);
            vacancyItem.appendChild(companyElement);
            vacancyItem.appendChild(salaryElement);
            vacancyItem.appendChild(descriptionElement);

            vacanciesList.appendChild(vacancyItem);
          });
        } else {
          const vacanciesList = document.getElementById('vacancies-list');
          vacanciesList.innerHTML = 'Нет результатов для отображения';
        }
      })
      .catch(error => {
        const vacanciesList = document.getElementById('vacancies-list');
        vacanciesList.innerHTML = 'Произошла ошибка при получении данных';
        console.log('Произошла ошибка при получении данных:', error);
      });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', searchVacancies);
});
