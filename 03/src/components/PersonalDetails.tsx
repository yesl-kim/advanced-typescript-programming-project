import { useState } from 'react'
import { Button, Col, Row } from 'reactstrap'
import { IPersonState } from '../state'
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

const PersonalDetails = () => {
  const [person, setPerson] = useState(defaultPerson)

  const updateBinding = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPerson((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const [canSave, setCanSave] = useState(false)
  const userCanSave = (hasErrors: boolean) => setCanSave(hasErrors)

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
            <Col>people</Col>
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
