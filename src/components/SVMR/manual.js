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
                            <div>{manual}</div>
                        </div>

                        <Button type="button">
                            <NavLink to="/tests/svmr">Начать</NavLink>
                        </Button>
                    </form>
                </PageCol>
            </PageRow>
        </Page>
    )
}

export default Settings
