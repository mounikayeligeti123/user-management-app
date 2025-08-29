import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatPaginatorModule]
})
export class UserTableComponent implements OnInit {
  users: User[] = [];
  columns: string[] = [];
  editingRow: User | null = null;
  displayedColumns: string[] = [];
  editingCol: User | null = null;
  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isRowClickDisable: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.dataSource.data = data;
      if (data.length > 0) {
        this.columns = Object.keys(data[0]);
        this.displayedColumns = [...this.columns];
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  goToDetails(row: User) {
    this.router.navigate(['/details', row.id]);
  }
  onCellChange(row: any, col: string) {
    console.log(`Edit Value updated: ${row[col]}`);
  }
}
