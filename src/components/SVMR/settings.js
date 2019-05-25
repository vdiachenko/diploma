import React from 'react'
import { NavLink } from 'react-router-dom'
import Page, { PageRow, PageCol } from '../Page'
import Button from '../Button'

const manual = `
Проверяется скорость Вашей реакции.
Перед Вами на экране в центре монитора будет появляться красный квадрат.
При появлении красного квадрата, Вам необходимо как можно быстрее нажать на левую кнопку мыши.
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
                            <input type="text" id="b" defaultValue="70" />
                            <label htmlFor="b">Количество повторений</label>
                        </div>

                        <Button type="submit">
                            <NavLink to="/tests/svmr">Сохранить</NavLink>
                        </Button>
                    </form>
                </PageCol>
            </PageRow>
        </Page>
    )
}

export default Settings
