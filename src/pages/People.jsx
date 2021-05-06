/* immport libraries */
import React from 'react'
import moment from 'moment'

/* import components */
import { requestData } from '../utils/api'
import TableSwapi from '../components/TableSwapi'

/* Задаем стили для картинки */
const imgStyle = {
    maxWidth: '120px',
}
function People() {
    const [page, setPage] = React.useState(1) // Стейт страниц
    const [state, setState] = React.useState([]) // стейт комонента
    const [gotEveryone, setGotEveryone] = React.useState(false) // проверка на получение всех элементов
    const [error, setError] = React.useState(null) // проверка на ошибки
    const [loading, setLoading] = React.useState(false) // проверка на загрузку данных

    /* Получаем асинхронный запрос, следим за изменением переменной page */
    React.useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            if (!gotEveryone && !error) {
                requestData(
                    setLoading,
                    setState,
                    setError,
                    setPage,
                    setGotEveryone,
                    page,
                    'people'
                )
            }
        }, 100)
    }, [page]) // eslint-disable-line
    /* Откатываем стейт компоненты, если перешли на другую страницу */
    React.useEffect(() => {
        return () => {
            setState([])
        }
    }, [])
    /* заполнение заголовков таблицы */
    const columns = [
        {
            title: 'Имя',
            dataIndex: 'name',
        },
        {
            title: 'Дата рождения',
            dataIndex: 'birth_year',
        },
        {
            title: 'Пол',
            dataIndex: 'gender',
        },
        {
            title: 'Рост',
            dataIndex: 'height',
        },
        {
            title: 'Вес',
            dataIndex: 'mass',
        },
        {
            title: 'Цвет волос',
            dataIndex: 'hair_color',
        },
        {
            title: 'Цвет кожи',
            dataIndex: 'skin_color',
        },
        {
            title: 'Цвет глаз',
            dataIndex: 'eye_color',
        },
        {
            title: 'Создано',
            dataIndex: 'created',
        },
        {
            title: 'Отредактировано',
            dataIndex: 'edited',
        },
    ]

    // составление значений у таблицы
    const data = state.map((item, i) => {
        return {
            key: i,
            name: item.name,
            gender:
                i < 4 ? (
                    <img
                        style={imgStyle}
                        src={`https://starwars-visualguide.com/assets/img/characters/${
                            i + 1
                        }.jpg`}
                        alt=""
                    />
                ) : (
                    item.gender
                ), // Здесь получаем 4 картинки, иначе заполняем поле из запроса
            birth_year: item.birth_year,

            height: item.height,
            mass: item.mass,
            hair_color: item.hair_color,
            skin_color: item.skin_color,
            eye_color: item.eye_color,
            created: moment(item.created).format('LLL'), // форматирование данных
            edited: moment(item.edited).format('LLL'),
        }
    })

    return error ? (
        <h1>Ошибка в запросе</h1>
    ) : (
        <TableSwapi
            data={data}
            columns={columns}
            loading={loading}
            pagination={true}
        />
    ) /* Если есть какие-то ошибки в запросе к апи, тогда выходит h1, иначе выводится таблица */
}

export default People
