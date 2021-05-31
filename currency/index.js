const table = document.body.querySelector('.table__body');

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);

const getInitialData = () => {
	return fetch(`https://www.nbrb.by/api/exrates/rates?periodicity=0`, {
		method: 'GET',
	}).then(checkResponse)
};

const getMillToTomorrowPlusOneMin = () => {
	const now = new Date();
	const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, now.getMinutes() + 1);
	const diff = tomorrow - now;
	return diff;
};

const createTd = (text) => {
	const tdEl = document.createElement('td');
	tdEl.prepend(text);
	return tdEl;
};

const createTr = (...data) => {
	const trEl = document.createElement('tr');
	data.forEach((el) => trEl.append(el));
	return trEl;
};

const createTableElement = (el) => {
	const abbreviationEl = createTd(el.Cur_Abbreviation);
	const scaleEl = createTd(el.Cur_Scale);
	const name = createTd(el.Cur_Name);
	const rate = createTd(el.Cur_OfficialRate);
	const element = createTr(name, scaleEl, abbreviationEl, rate);
	return element;
};

const prependToContainer = (container, data) => container.prepend(data);
const renderData = (container, data) => data.forEach((el) => prependToContainer(container, createTableElement(el)));

getInitialData().then((data) => renderData(table, data));

const timerId = setInterval(() => getInitialData().then((newData) =>  {
	table.innerHTML = '';
	console.log('reRender');
	renderData(table, newData);
}), getMillToTomorrowPlusOneMin());
