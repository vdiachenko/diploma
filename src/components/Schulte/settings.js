import React from 'react'
import { NavLink } from 'react-router-dom'
import Page, { PageRow, PageCol } from '../Page'
import Button from '../Button'

const manual = `
Предлагаемая Вашему вниманию методика представляет собою пять (5) таблиц,
в каждой из которых находится числа от 1 до 25, расположеные не по порядку.
Вам необходимо, используя левую кнопку мыши, найти и указать все числа по порядку
от 1 до 25 в каждой таблице. 
После окончания выполенения задания с первой таблицей автоматически будет предъявлена вторая 
и т.д.
Постарайтесь выполнять как можно быстрее и без ошибок.

Выбор числа осуществляется установкой курсора мыши на нужное число и 
однократным нажатием левой кнопки мыши.
`

function Settings() {
    return (
        <Page title="Таблицы Шульте / Конфигурация">
            <PageRow>
                <PageCol>
                    <p>
                        <b>Инструкция</b>
                    </p>

                    <form>
                        <div className="row">
                            <textarea defaultValue={manual} />
                        </div>

                        <div className="row">
                            <input type="text" id="a" defaultValue="5" />
                            <label htmlFor="a">Количество стимулов</label>
                        </div>

                        <div className="row">
                            <input type="text" id="b" defaultValue="5x5" />
                            <label htmlFor="b">Размерность</label>
                        </div>

                        <Button type="submit">
                            <NavLink to="/tests/schulte">Сохранить</NavLink>
                        </Button>
                    </form>
                </PageCol>
            </PageRow>
        </Page>
    )
}

export default Settings
