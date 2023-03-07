import Admin, { IAdmin } from '../model/Admin';

class AdminService {
  async getAdminByName(name: string) {
    const admin: IAdmin | null = await Admin.findOne({
      where: { name },
    });
    return admin;
  }
  async getAdminById(id: number) {
    const admin: IAdmin | null = await Admin.findByPk(id);
    return admin;
  }
  // 新增管理员
  addAdmin(admin: IAdmin) {
    return Admin.create(admin);
  }
  // 更新管理员
  updateAdmin(id: number, admin: IAdmin) {
    return Admin.update(admin, { where: { id } });
  }
  deleteAdmin() {}
}

export default new AdminService();
