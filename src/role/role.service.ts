import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: RoleRepository,
  ) {}

  create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleRepository.save(this.roleRepository.create(createRoleDto));
  }

  findAll() {
    return this.roleRepository.find();
  }

  findOne(fields: EntityCondition<Role>): Promise<Role> {
    return this.roleRepository.findOneOrFail({
      where: fields,
    });
  }

  async update(id: Role['id'], payload: DeepPartial<Role>) {
    await this.roleRepository.update({ id }, payload);
  }

  async softRemove(id: number) {
    await this.roleRepository.softRemove({ id });
  }
}
