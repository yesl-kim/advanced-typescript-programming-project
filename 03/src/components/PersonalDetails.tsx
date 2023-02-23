import { useState } from 'react'
import { Button, Col, Row } from 'reactstrap'
import { Database } from '../database/Database'
import { PersonalDetailsTableBuilder } from '../database/PersonalDetailsTableBuilder'
import { TableBuilder } from '../database/TableBuilder'
import { IPersonState, RecordState } from '../state'
import { PersonRecord } from '../types'
import { FormValidation } from '../validation/FormValidation'

const defaultPerson: Readonly<IPersonState> = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: null,
  town: '',
  county: '',
  phoneNumber: '',
  postcode: '',
  dateOfBirth: new Date().toISOString().substring(0, 10),
  personId: '',
}

interface Props {}

const PersonalDetails = () => {
  const tableBuilder = new PersonalDetailsTableBuilder()
  const dataLayer: Database<PersonRecord> = new Database(tableBuilder.build())
  // let people: IPersonState[] = []
  const [people, setPeople] = useState<PersonRecord[]>([])
  const [person, setPerson] = useState(defaultPerson)

  const updateBinding = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPerson((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const [canSave, setCanSave] = useState(false)
  const userCanSave = (hasErrors: boolean) => setCanSave(hasErrors)

  const loadPeople = () => {
    dataLayer.read().then((peopleFromDB: PersonRecord[]) => {
      setPeople(peopleFromDB)
    })
  }

  const setActive = (personId: string) => {
    const _person = people.find(p => p.personId === personId)
    if(_person) setPerson(_person)
  }

  // TODO: 2023.02.24 ~ 여기부터 시작!
  const deletePerson = (personId: string) => {
    const _person = people.find(p => p.personId)
    const state = new RecordState()
    const personState = {..._person, ...state}
    dataLayer.update(personState)
    loadPeople()
    // clear()
  }

  return (
    <Row>
      <Col lg="8">
        <Row>
          <Col>
            <h4 className="mb-3">Personal details</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <Col>
                <label htmlFor="firstName">First name</label>
              </Col>
              <Col>
                <label htmlFor="lastName">Last name</label>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <Col>
                <input
                  type="text"
                  id="firstName"
                  className="form-control"
                  placeholder="First name"
                  value={person.firstName}
                  onChange={updateBinding}
                />
              </Col>

              <Col>
                <input
                  type="text"
                  id="lastName"
                  className="form-control"
                  placeholder="Last name"
                  value={person.lastName}
                  onChange={updateBinding}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <label htmlFor="address1">Address line 1</label>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              type="text"
              id="address1"
              className="form-control"
              placeholder="Address line 1"
              value={person.address1}
              onChange={updateBinding}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label htmlFor="address2">Address line 2</label>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              type="text"
              id="address2"
              className="form-control"
              placeholder="Address line 2"
              value={person.address2 ?? ''}
              onChange={updateBinding}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label htmlFor="town">Town</label>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              type="text"
              id="town"
              className="form-control"
              placeholder="Town"
              value={person.town}
              onChange={updateBinding}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label htmlFor="county">County</label>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              type="text"
              id="county"
              className="form-control"
              placeholder="County"
              value={person.county}
              onChange={updateBinding}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <Col lg="3">
                <label htmlFor="postcode">Postal/ZipCode</label>
              </Col>
              <Col lg="4">
                <label htmlFor="phoneNumber">Phone number</label>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <Col lg="3">
                <input
                  type="text"
                  id="postcode"
                  className="form-control"
                  value={person.postcode}
                  onChange={updateBinding}
                />
              </Col>
              <Col lg="4">
                <input
                  type="text"
                  id="phoneNumber"
                  className="form-control"
                  value={person.phoneNumber}
                  onChange={updateBinding}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <label htmlFor="dateOfBirth">Date of birth</label>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              type="date"
              id="dateOfBirth"
              value={person.dateOfBirth ?? ''}
              onChange={updateBinding}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button size="lg" color="primary">
              Save
            </Button>
          </Col>
          <Col>
            <Button size="lg" color="secondary">
              Clear
            </Button>
          </Col>
        </Row>
        <Row>
          <FormValidation currentstate={person} canSave={setCanSave} />
        </Row>
      </Col>
      <Col>
        <Col>
          <Row>
            <Col>
              {people.map((p) => (
                <Row key={p.personId}>
                  <Col lg="6">
                    <label>{`${p.firstName} ${p.lastName}`}</label>
                  </Col>
                  <Col lg="3">
                    <Button value={p.personId} color="link" onClick={setActive}>
                      Edit
                    </Button>
                  </Col>
                  <Col lg="3">
                    <Button
                      value={p.personId}
                      color="link"
                      onClick={delete}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <Button size="lg" color="success">
                Load
              </Button>
            </Col>
            <Col lg="6">
              <Button size="lg" color="info">
                New Person
              </Button>
            </Col>
          </Row>
        </Col>
      </Col>
    </Row>
  )
}

export default PersonalDetails
