import { Model, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  id!: number;
  teamName: string;
}

Team.init({
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'team',
  timestamps: false,
});

export default Team;
