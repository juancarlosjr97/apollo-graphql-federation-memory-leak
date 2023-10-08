# Apollo GraphQL Federation Memory Leak

This project demonstrates how to reproduce a memory leak when running Apollo GraphQL Federation.

## Prerequisites

- [K6](https://k6.io/)
- Docker

## Analysis

It has been observed that sending unique operation signatures causes the memory of the service running the Gateway to increase and not be released, as opposed to sending the same operation signature repeatedly, where memory remains stable throughout the request window.

### Request

Both cases were executed with the following parameters:

- Transactions Per Second (TPS): 1 TPS
- Execution time: 10 minutes
- Resolver returns dummy data

### Reproduction

To run GraphQL Federation, execute the following command:

```bash
docker-compose up
```

Between each test, execute docker-compose restart to restart the container before sending a batch of requests.

#### Container Usage and Performance

The project utilizes cAdvisor to provide insights into resource usage and performance characteristics of running containers. Access it at http://localhost:8080/containers/docker.

Alternatively, run `docker stats` to see the stats of the containers running.

#### Sending Unique Operation Signatures

When running with 1 TPS and sending unique operation signatures on every request, Docker takes less than 10 minutes to reach 99% memory usage. After 10 minutes, K6 stops sending requests, but the memory remains above 90% usage.

To execute this test, run:

```bash
k6 run requests_unique_operation_signature.js
```

#### Sending the Same Operation Signature

Running with 1 TPS and sending the same operation signature on every request results in stable memory usage at 50% of the container's memory.

To execute this test, run:

```bash
k6 run requests_same_operation_signature.js
```
