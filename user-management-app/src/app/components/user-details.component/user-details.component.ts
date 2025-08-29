import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  standalone: true,
  imports: [CommonModule, MatCardModule]
})
export class UserDetailsComponent implements OnInit {
  user: User | undefined = {
    id: 0,
    name: '',
    language: '',
    bio: '',
    version: ''
  };

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUsers().subscribe(users => {
      this.user = users.find(u => String(u.id) === id);
    });
  }
}
