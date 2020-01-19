import UsersRepository from "./usersRepository";
import CommitRepository from "./commitRepository";
import EmployerRepository from "./employerRepository";
import ContractRepository from "./contractRepository";

const repositories = {
    users: UsersRepository,
    commit: CommitRepository,
    employer: EmployerRepository,
    contract: ContractRepository,
    // other repositories ...
};

export const RepositoryFactory = {
    get: name => repositories[name]
};