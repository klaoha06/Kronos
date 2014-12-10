require 'test_helper'

class AuthsControllerTest < ActionController::TestCase
  setup do
    @auth = auths(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:auths)
  end

  test "should create auth" do
    assert_difference('Auth.count') do
      post :create, auth: {  }
    end

    assert_response 201
  end

  test "should show auth" do
    get :show, id: @auth
    assert_response :success
  end

  test "should update auth" do
    put :update, id: @auth, auth: {  }
    assert_response 204
  end

  test "should destroy auth" do
    assert_difference('Auth.count', -1) do
      delete :destroy, id: @auth
    end

    assert_response 204
  end
end
