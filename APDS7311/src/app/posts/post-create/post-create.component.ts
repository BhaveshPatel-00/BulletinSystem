/*
Code Attribution
Academind
Angular & NodeJS - The MEAN Stack Guide [2021 Edition]
https://pro.academind.com/p/angular-nodejs-the-mean-stack-guide-2020-edition
Maximilian Schwarzmüller
https://pro.academind.com/courses/765943/author_bio
*/

/*
Code Attribution
Varsity College APDS7311 LAB GUIDE Part A
https://learn-eu-central-1-prod-fleet01-xythos.learn.cloudflare.blackboardcdn.com/5f5880ccc4141/1747273?X-Blackboard-Expiration=1622300400000&X-Blackboard-Signature=rc5e9W17qyi7M5ZeaCe4iQdgVI6G07FGUMttY4A1cz8%3D&X-Blackboard-Client-Id=515070&response-cache-control=private%2C%20max-age%3D21600&response-content-disposition=inline%3B%20filename%2A%3DUTF-8%27%27ADPS%2520Lab%2520Guide%2520Complete.pdf&response-content-type=application%2Fpdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20210529T090000Z&X-Amz-SignedHeaders=host&X-Amz-Expires=21600&X-Amz-Credential=AKIAZH6WM4PL5M5HI5WH%2F20210529%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=4656ea88610acfcf56266d9664cf513d76436b18a13e9aa0fd0c31e6dd68220c
Varsity College
https://www.varsitycollege.co.za/
*/

import { Component, OnInit, SecurityContext } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { PostsService } from "../post.service";
import { Post } from "../post.model";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  post: Post;
  private mode = "create";
  private postId: string;
  output: string;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute,
    protected sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            creator: postData.creator
          };
        })
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === "create") {
      this.postsService.addPost(form.value.title, form.value.content)
    } else {
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    }
    //Sanitize user input - POE
    this.output=this.sanitizer.sanitize(SecurityContext.HTML, form.value.content)
    form.resetForm();
  }
}
