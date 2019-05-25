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
`

function Settings() {
    return (
        <Page title="Таблицы Шульте / Инструкция">
            <PageRow>
                <PageCol>
                    <p>
                        <b>Инструкция</b>
                    </p>

                    <form>
                        <div className="row">
                            <div>{manual}</div>
                        </div>

                        <div className="row">
                            <small>
                                Выбор числа осуществляется установкой курсора
                                мыши на нужное число и однократным нажатием
                                левой кнопки мыши.
                            </small>
                        </div>

                        <Button type="submit">
                            <NavLink to="/tests/schulte">Начать</NavLink>
                        </Button>
                    </form>
                </PageCol>
            </PageRow>
        </Page>
    )
}

export default Settings
