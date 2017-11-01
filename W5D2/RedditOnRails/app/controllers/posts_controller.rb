class PostsController < ApplicationController
  # def index
  #   @posts = Post.all
  # end

  def new
    @post = Post.new
  end

  def show
    @post = Post.find(params[:id])
  end

  def edit
    @post = Post.find(params[:id])
  end

  def create
    @post = Post.new(post_params)
    @post.user_id = current_user.id
    # if params[:sub_id]
    @post.sub_id = params[:sub_id]
    # else
      # debugger
      # @post.sub_id = params[:post_id]
    # end
    if @post.save
      redirect_to subs_url
      # redirect_to sub_url(@post.sub_id)
    else
      flash[:errors] = @post.errors.full_messages
      render :new
    end
  end

  def update
    @post = Post.find(params[:id])
    if @post.update_attributes(post_params)
      redirect_to subs_url
      # redirect_to sub_url(@post.sub_id)
    else
      flash[:errors] = @post.errors.full_messages
      render :edit
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    redirect_to subs_url#(@post.sub.id)
  end

  private
  def post_params
    params.require(:post).permit(:title, :content)
  end
end
