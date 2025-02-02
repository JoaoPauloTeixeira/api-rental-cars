export const defaultError = {
    status: 'error',
    message: 'Error in operation',
    httpCode: 500
}

export const vehicleNotFound = {
    status: 'Fail-001',
    message: 'vehicle not found',
    httpCode: 404
}

export const vehicleUnavailable = {
    status: 'Fail-002',
    message: 'vehicle unavailable',
    httpCode: 500
}

export const driverWithCurrentLease = {
    status: 'Fail-003',
    message: 'driver with current lease',
    httpCode: 500
}