def largest(arr):
    max_element = arr[0]
    for num in arr:
        if num > max_element:
            max_element = num
    return max_element
arr = [1,9,33,14]
print("Largest element is:",largest(arr))
