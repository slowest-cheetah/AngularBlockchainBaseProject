import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public admins: string[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.listAdmins();
  }

  addAdmin(adminAddress: string): void {
    this.adminService.addAdmin(adminAddress).subscribe(result => {
      console.log('Admin added successfully:', result);
    });
  }

  listAdmins(){
    this.adminService.listAdmins().subscribe(admins => {
      this.admins = admins;
    });
  }

}
