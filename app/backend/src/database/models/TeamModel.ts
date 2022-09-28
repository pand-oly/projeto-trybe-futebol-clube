import { Model, STRING } from 'sequelize';
import db from '.';
import Matche from './MatcheModel';

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

Team.hasMany(Matche, { foreignKey: 'home_team', as: 'matche' });

export default Team;
